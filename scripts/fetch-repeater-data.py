#!/usr/bin/env python3
"""
Fetch repeater status from letsmesh.net API using cloudscraper.

The letsmesh.net API is behind Cloudflare protection. This script uses
cloudscraper to handle Cloudflare's anti-bot challenges and fetch the
JSON data directly via HTTP.

If the fetch fails, the script leaves the existing data file unchanged.
"""

import json
import logging
import time
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Configuration - API settings
API_ENDPOINT = "https://api.letsmesh.net/api/packets/filtered"
API_TIMEOUT = 30  # seconds
API_RETRIES = 3
ONLINE_THRESHOLD_MINUTES = 240  # Node is online if heard within last 240 minutes
RSSI_MIN = -120  # dBm
RSSI_MAX = 0  # dBm

# Configuration - Mesh Observer Settings
# Set these to your observer node's public key and region
OBSERVER_PUBLIC_KEY = "2b63bf3df73da29f30df1308aca6480e9f09abb43a8993533465a5fed60ccad7"  # lowercase hex
MESH_REGION = "CMH"  # Geographic region (e.g., CMH for Columbus, OH)

# Determine output path
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
OUTPUT_FILE = PROJECT_ROOT / "data" / "repeater-status.json"
BACKUP_FILE = PROJECT_ROOT / "data" / "repeater-status.json.bak"


def fetch_api_data(observer_key, region, max_retries=API_RETRIES):
    """
    Fetch packet data from letsmesh.net API using cloudscraper.
    
    Uses cloudscraper to handle Cloudflare's anti-bot challenges and fetch
    JSON data directly via HTTP, without needing a full browser.
    
    Args:
        observer_key: Observer node public key
        region: Geographic region (e.g., CMH)
        max_retries: Number of retry attempts
        
    Returns:
        List of packet dictionaries or None if fetch fails
    """
    if not observer_key or observer_key == "your_observer_public_key_here":
        logger.warning("OBSERVER_PUBLIC_KEY not configured.")
        return None
    
    try:
        import cloudscraper
    except ImportError:
        logger.error("cloudscraper not installed. Install with: pip install cloudscraper")
        return None
    
    api_url = f"{API_ENDPOINT}?observer={observer_key}&region={region}&limit=500"
    
    for attempt in range(max_retries):
        try:
            logger.info(f"Fetching API data (attempt {attempt + 1}/{max_retries})...")
            
            scraper = cloudscraper.create_scraper(
                browser={
                    'browser': 'chrome',
                    'platform': 'linux',
                }
            )
            
            logger.info(f"Loading: {api_url[:70]}...")
            response = scraper.get(api_url, timeout=API_TIMEOUT)
            
            logger.debug(f"Response status: {response.status_code}")
            logger.debug(f"Response content length: {len(response.text)} chars")
            
            if response.status_code != 200:
                logger.warning(f"HTTP {response.status_code} response")
                if attempt < max_retries - 1:
                    wait_time = 2 ** attempt
                    logger.info(f"Waiting {wait_time}s before retry...")
                    time.sleep(wait_time)
                continue
            
            # Try to parse JSON directly
            try:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    logger.info(f"Successfully fetched {len(data)} packets")
                    logger.debug(f"Sample packet 1: payload_type={data[0].get('payload_type')}")
                    return data
                elif isinstance(data, list):
                    logger.warning("API returned an empty list")
                    return data
                else:
                    logger.warning(f"Unexpected response type: {type(data).__name__}")
            except json.JSONDecodeError:
                # Response might contain HTML (Cloudflare challenge page) 
                if "Just a moment" in response.text or "Cloudflare" in response.text:
                    logger.warning("Got Cloudflare challenge page despite cloudscraper")
                else:
                    logger.warning(f"Response is not valid JSON (first 200 chars): {response.text[:200]}")
            
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                logger.info(f"Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
                
        except Exception as e:
            logger.warning(f"Fetch error: {str(e)[:200]} (attempt {attempt + 1}/{max_retries})")
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                logger.info(f"Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
    
    logger.error(f"Failed to fetch API data after {max_retries} attempts")
    return None


def filter_repeater_packets(packets):
    """
    Filter packets to keep only repeater advertisements.
    
    Args:
        packets: List of packet dictionaries from API
        
    Returns:
        List of repeater advertisement packets
    """
    if not packets:
        return []
    
    repeater_packets = []
    for packet in packets:
        # Filter for Advert type packets with Repeater mode
        if (packet.get("payload_type") == "Advert" and 
            packet.get("decoded_payload", {}).get("mode") == "Repeater"):
            repeater_packets.append(packet)
            logger.debug(f"Found repeater packet: {packet.get('decoded_payload', {}).get('name')} (id={packet.get('id')})")
    
    logger.info(f"Filtered {len(repeater_packets)} repeater packets from {len(packets)} total")
    return repeater_packets


def aggregate_repeaters(packets):
    """
    Aggregate repeater packets by public_key to get latest information.
    
    Args:
        packets: List of repeater advertisement packets
        
    Returns:
        Dictionary mapping public_key to latest packet info
    """
    repeaters = {}
    
    for packet in packets:
        # Public key is in decoded_payload for Advert packets
        public_key = packet.get("decoded_payload", {}).get("public_key")
        if not public_key:
            continue
        
        # Keep only the most recent packet for each repeater
        if public_key not in repeaters:
            repeaters[public_key] = packet
        else:
            # Compare timestamps to keep the most recent
            current_heard = repeaters[public_key].get("heard_at", "")
            new_heard = packet.get("heard_at", "")
            if new_heard > current_heard:
                repeaters[public_key] = packet
    
    logger.info(f"Aggregated into {len(repeaters)} unique repeaters")
    return repeaters


def calculate_online_status(heard_at_str, threshold_minutes=ONLINE_THRESHOLD_MINUTES):
    """
    Determine if repeater is online based on last heard time.
    
    Args:
        heard_at_str: ISO format timestamp string
        threshold_minutes: Minutes within which to consider online
        
    Returns:
        Tuple of (status_string, datetime_object)
    """
    try:
        # Parse ISO format timestamp
        heard_at = datetime.fromisoformat(heard_at_str.replace('Z', '+00:00'))
        now = datetime.now(timezone.utc)
        time_diff = now - heard_at
        
        if time_diff < timedelta(minutes=threshold_minutes):
            return "online", heard_at
        else:
            return "offline", heard_at
    except (ValueError, AttributeError):
        logger.warning(f"Invalid timestamp format: {heard_at_str}")
        return "unknown", None


def calculate_rssi_percentage(rssi_dbm):
    """
    Convert RSSI dBm value to percentage (0-100).
    
    Formula: -120 dBm = 0%, 0 dBm = 100%
    
    Args:
        rssi_dbm: Signal strength in dBm (typically -120 to 0)
        
    Returns:
        Percentage value (0-100) or None if invalid
    """
    if rssi_dbm is None:
        return None
    
    try:
        rssi = float(rssi_dbm)
        # Clamp to valid range
        rssi = max(RSSI_MIN, min(RSSI_MAX, rssi))
        # Convert to percentage: 0% at -120dBm, 100% at 0dBm
        percentage = ((rssi - RSSI_MIN) / (RSSI_MAX - RSSI_MIN)) * 100
        return round(percentage, 1)
    except (ValueError, TypeError):
        return None


def build_node_record(public_key, packet):
    """
    Build a node record from a repeater advertisement packet.
    
    Args:
        public_key: Unique node identifier
        packet: API packet dictionary
        
    Returns:
        Node record dictionary
    """
    decoded = packet.get("decoded_payload", {})
    heard_at_str = packet.get("heard_at", "")
    status, heard_dt = calculate_online_status(heard_at_str)
    
    # Generate a simple ID from public key
    node_id = f"node-{public_key[:12].lower()}"
    
    # Extract location
    latitude = decoded.get("lat")
    longitude = decoded.get("lon")
    
    record = {
        "id": node_id,
        "name": packet.get("node_name", f"Node {public_key[:8]}"),
        "status": status,
        "publicKey": public_key,
        "location": {
            "latitude": latitude,
            "longitude": longitude,
            "address": ""  # Could be enhanced with reverse geocoding
        },
        "lastSeen": heard_at_str,
        "signalStrength": packet.get("rssi"),
        "signalPercentage": calculate_rssi_percentage(packet.get("rssi")),
        "batteryLevel": None,  # Not available from API
        "uptime": None,  # Not available from API
        "hardware": decoded.get("hw_model", "Unknown"),
        "firmware": decoded.get("firmware_version", "Unknown"),
        "role": decoded.get("mode", "Unknown")
    }
    
    return record


def calculate_network_stats(nodes):
    """
    Calculate aggregate network statistics.
    
    Args:
        nodes: List of node records
        
    Returns:
        Dictionary with network statistics
    """
    if not nodes:
        return {
            "totalNodes": 0,
            "onlineNodes": 0,
            "offlineNodes": 0,
            "averageSignal": None,
            "networkHealth": "unknown",
            "lastUpdated": datetime.now(timezone.utc).isoformat()
        }
    
    total = len(nodes)
    online = sum(1 for n in nodes if n["status"] == "online")
    offline = total - online
    
    # Calculate average signal strength (for nodes that have it)
    signals = [n["signalStrength"] for n in nodes if n["signalStrength"] is not None]
    avg_signal = round(sum(signals) / len(signals), 1) if signals else None
    
    # Calculate network health percentage
    health_percent = round((online / total * 100), 1) if total > 0 else 0
    
    # Determine health status
    if health_percent >= 90:
        health_status = "excellent"
    elif health_percent >= 75:
        health_status = "good"
    elif health_percent >= 50:
        health_status = "fair"
    else:
        health_status = "poor"
    
    return {
        "totalNodes": total,
        "onlineNodes": online,
        "offlineNodes": offline,
        "healthPercentage": health_percent,
        "averageSignal": avg_signal,
        "networkHealth": health_status,
        "lastUpdated": datetime.now(timezone.utc).isoformat()
    }



def load_previous_data():
    """
    Load previously saved repeater status data from JSON file.
    
    Returns:
        Dictionary with previous data or None if file doesn't exist or is invalid
    """
    try:
        if OUTPUT_FILE.exists():
            with open(OUTPUT_FILE, 'r') as f:
                data = json.load(f)
            logger.info(f"Loaded previous data from {OUTPUT_FILE}")
            return data
    except (json.JSONDecodeError, IOError) as e:
        logger.warning(f"Could not load previous data: {e}")
    return None


def save_json_data(data):
    """
    Save repeater status data to JSON file.
    
    Args:
        data: Dictionary to save
        
    Returns:
        True if successful, False otherwise
    """
    try:
        # Create backup of previous file
        if OUTPUT_FILE.exists():
            # Remove existing backup first (Windows doesn't allow rename to existing file)
            if BACKUP_FILE.exists():
                BACKUP_FILE.unlink()
            OUTPUT_FILE.rename(BACKUP_FILE)
        
        # Ensure output directory exists
        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        
        # Write new file with pretty formatting
        with open(OUTPUT_FILE, 'w') as f:
            json.dump(data, f, indent=2)
        
        logger.info(f"Saved repeater status to {OUTPUT_FILE}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to save JSON file: {e}")
        return False


def main():
    """Main execution function."""
    logger.info("=" * 60)
    logger.info("Starting repeater status fetch from letsmesh.net API")
    logger.info(f"Observer: {OBSERVER_PUBLIC_KEY[:16]}..." if OBSERVER_PUBLIC_KEY else "Observer: NOT SET")
    logger.info(f"Region: {MESH_REGION}")
    logger.info("=" * 60)
    
    # Fetch data from API using cloudscraper
    api_data = fetch_api_data(OBSERVER_PUBLIC_KEY, MESH_REGION)
    
    if api_data is None:
        logger.warning("Failed to fetch API data - leaving existing data file unchanged")
        return 0
    
    # Filter for repeater packets
    repeater_packets = filter_repeater_packets(api_data)
    
    if not repeater_packets:
        logger.warning("No repeater packets found in API response")
        # Use previous data if available
        previous_data = load_previous_data()
        if previous_data:
            logger.info("Using previous repeater status data")
            save_json_data(previous_data)
            return 0
    
    # Aggregate repeaters by public key
    repeaters = aggregate_repeaters(repeater_packets)
    
    # Build node records
    nodes = [build_node_record(pk, packet) for pk, packet in repeaters.items()]
    
    # Calculate network statistics
    stats = calculate_network_stats(nodes)
    
    # Build output structure
    output = {
        "lastUpdated": stats["lastUpdated"],
        "totalNodes": stats["totalNodes"],
        "onlineNodes": stats["onlineNodes"],
        "offlineNodes": stats["offlineNodes"],
        "healthPercentage": stats["healthPercentage"],
        "networkHealth": stats["networkHealth"],
        "averageSignal": stats["averageSignal"],
        "nodes": sorted(nodes, key=lambda n: n["name"])
    }
    
    # Save to file
    if save_json_data(output):
        logger.info("=" * 60)
        logger.info(f"SUCCESS: Found {stats['totalNodes']} repeaters")
        logger.info(f"  - Online: {stats['onlineNodes']}")
        logger.info(f"  - Offline: {stats['offlineNodes']}")
        logger.info(f"  - Network Health: {stats['networkHealth']} ({stats['healthPercentage']}%)")
        logger.info(f"  - Avg Signal: {stats['averageSignal']} dBm")
        logger.info("=" * 60)
        return 0
    else:
        logger.error("Failed to save output file")
        return 1


if __name__ == "__main__":
    sys.exit(main())
