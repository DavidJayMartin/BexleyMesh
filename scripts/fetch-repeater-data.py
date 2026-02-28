#!/usr/bin/env python3
"""
Fetch repeater status from letsmesh.net API using a headless browser with Selenium.

The letsmesh.net API blocks direct programmatic requests but allows browser requests.
This script uses Selenium with Firefox/Chrome to load the page like a real browser,
then extracts the JSON data that's loaded dynamically by the page's JavaScript.

If the fetch fails, the script leaves the existing data file unchanged.
"""

import json
import logging
import time
import sys
import re
from datetime import datetime, timezone, timedelta
from pathlib import Path
from collections import defaultdict

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
    Fetch packet data from letsmesh.net API using browser-like HTTP requests.
    
    Uses the requests library with browser-like headers to mimic a real browser,
    since letsmesh.net blocks requests that don't appear to come from a browser.
    
    Args:
        observer_key: Observer node public key
        region: Geographic region (e.g., CMH)
        max_retries: Number of retry attempts
        
    Returns:
        List of packet dictionaries or None if fetch fails
    """
def fetch_api_data(observer_key, region, max_retries=API_RETRIES):
    """
    Fetch packet data from letsmesh.net API using a headless browser with Selenium.
    
    The API page loads an HTML viewer interface that dynamically loads JSON data via JavaScript.
    We use Selenium to load the page with Firefox and parse the page source for JSON.
    
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
        from selenium import webdriver
        from selenium.webdriver.firefox.options import Options as FirefoxOptions
        from selenium.webdriver.chrome.options import Options as ChromeOptions
        from selenium.webdriver.common.by import By
        from webdriver_manager.firefox import GeckoDriverManager
        from webdriver_manager.chrome import ChromeDriverManager
        from selenium.webdriver.firefox.service import Service as FirefoxService
        from selenium.webdriver.chrome.service import Service as ChromeService
    except ImportError:
        logger.error("Selenium not installed. Install with: pip install selenium webdriver-manager")
        return None
    
    api_url = f"{API_ENDPOINT}?observer={observer_key}&region={region}&limit=500"
    
    for attempt in range(max_retries):
        driver = None
        try:
            logger.info(f"Fetching API data with headless browser (attempt {attempt + 1}/{max_retries})...")
            
            # Try Firefox first (more reliable in headless mode)
            try:
                firefox_options = FirefoxOptions()
                firefox_options.add_argument("--headless")
                driver = webdriver.Firefox(
                    service=FirefoxService(GeckoDriverManager().install()),
                    options=firefox_options
                )
                logger.info("Using Firefox headless browser")
            except Exception as firefox_error:
                logger.debug(f"Firefox failed: {firefox_error}. Trying Chrome...")
                chrome_options = ChromeOptions()
                chrome_options.add_argument("--headless=new")
                chrome_options.add_argument("--no-sandbox")
                driver = webdriver.Chrome(
                    service=ChromeService(ChromeDriverManager().install()),
                    options=chrome_options
                )
                logger.info("Using Chrome headless browser")
            
            # Set timeouts
            driver.set_page_load_timeout(API_TIMEOUT)
            
            # Load the API page
            logger.info(f"Loading: {api_url[:70]}...")
            driver.get(api_url)
            
            # Wait for the page to fully load JavaScript content
            logger.debug("Waiting for page content to load...")
            time.sleep(5)  # Give time for page to load
            
            # Firefox's JSON viewer has tabs - we need to click the "Raw Data" tab to get plain JSON
            try:
                logger.debug("Clicking 'Raw Data' tab...")
                raw_data_tab = driver.find_element(By.ID, "rawdata-tab")
                raw_data_tab.click()
                logger.debug("Clicked Raw Data tab, waiting for content...")
                time.sleep(3)  # Wait for tab content to render
            except Exception as e:
                logger.debug(f"Could not click Raw Data tab: {e}")
            
            # Get the raw data panel content
            try:
                raw_panel = driver.find_element(By.ID, "rawdata-panel")
                # Try textContent first (better for large JSON blocks)
                raw_text = raw_panel.get_attribute("textContent") or raw_panel.text
                logger.debug(f"Raw panel text length: {len(raw_text) if raw_text else 0} chars")
                if raw_text:
                    logger.debug(f"Raw panel preview (first 100): {raw_text[:100]}")
                    logger.debug(f"Raw panel preview (last 100): {raw_text[-100:]}")
                
                if raw_text:
                    # Find the JSON array in the text - might be wrapped or have extra content
                    json_start = raw_text.find('[')
                    json_end = raw_text.rfind(']')
                    
                    if json_start != -1 and json_end != -1 and json_end > json_start:
                        json_str = raw_text[json_start:json_end+1]
                        logger.debug(f"Extracted JSON substring length: {len(json_str)} chars")
                        try:
                            data = json.loads(json_str)
                            if isinstance(data, list) and len(data) > 0:
                                logger.info(f"Successfully extracted {len(data)} packets from Raw Data tab")
                                # Log sample packets for debugging
                                if data and len(data) > 0:
                                    logger.debug(f"Sample packet 1: payload_type={data[0].get('payload_type')}, decoded_mode={data[0].get('decoded_payload', {}).get('mode') if data[0].get('payload_type') == 'Advert' else 'N/A'}")
                                return data
                        except json.JSONDecodeError as e:
                            logger.debug(f"Failed to parse extracted JSON: {e}")
            except Exception as e:
                logger.debug(f"Could not get raw panel: {e}")
            
            # Fallback: Try to get JSON from page source or body
            page_source = driver.page_source
            logger.debug(f"Trying page source (length {len(page_source)} chars)...")
            
            # Try to extract JSON from page source
            start_idx = page_source.find('[')
            if start_idx != -1:
                # Limit search to first 100000 chars to avoid performance issues
                search_text = page_source[start_idx:start_idx+100000]
                # Try progressively smaller chunks
                for end_offset in range(len(search_text), 100, -1000):
                    candidate = search_text[:end_offset].strip()
                    if candidate.endswith(']'):
                        try:
                            data = json.loads(candidate)
                            if isinstance(data, list) and len(data) > 0:
                                logger.info(f"Successfully extracted {len(data)} packets from page source")
                                return data
                        except:
                            pass
            
            logger.error("Could not extract valid JSON from page")
            return None
            
        except Exception as e:
            logger.warning(f"Browser fetch error: {str(e)[:100]} (attempt {attempt + 1}/{max_retries})")
            if attempt < max_retries - 1:
                wait_time = 2 ** attempt
                logger.info(f"Waiting {wait_time}s before retry...")
                time.sleep(wait_time)
        finally:
            if driver:
                try:
                    driver.quit()
                except:
                    pass
    
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
    
    # Fetch data from API using headless browser
    api_data = fetch_api_data(OBSERVER_PUBLIC_KEY, MESH_REGION)
    
    if api_data is None:
        logger.warning("Failed to fetch API data - leaving existing data file unchanged")
        return 1
    
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
