---
title: Hardware Guide
---

# Hardware Guide for BexleyMesh

This guide provides detailed information about the hardware components used in the BexleyMesh network.

## Repeater Hardware

### RAK19007 WisGate Connect

The primary repeater platform for BexleyMesh infrastructure deployments.

**Specifications:**
- LoRa Radio: 868/915 MHz ISM band
- Range: Up to 20km line-of-sight
- Power: 25W peak output
- Connectivity: Ethernet, WiFi, LTE/4G options
- Gateway performance: High capacity multi-channel

**Use Case**: Primary network nodes, coverage expansion, community infrastructure

**Setup**: Advanced - requires some networking knowledge

---

## Portable Hardware

### RAK4631 WisBlock Core

Modular platform suitable for field deployments and experimentation.

**Specifications:**
- LoRa Radio: 868/915 MHz
- Range: 8-15km typical
- Power: Battery or USB powered
- Modular expansions: Temperature, humidity, GPS sensors available

**Use Case**: Testing, mobile units, experimental deployments

**Setup**: Intermediate - firmware flashing required

---

### RAK3272S Compact Transceiver

Small, portable device for individual users.

**Specifications:**
- LoRa Radio: 868/915 MHz
- Range: 5-10km typical
- Power: 2000mAh battery, 5+ hours use
- Size: Pocket-sized, ~200g with antenna

**Use Case**: Personal devices, testing, learning

**Setup**: Beginner-friendly

---

## Power Systems

### Solar Power

For stationary repeater installations:

- **Panel Size**: 10-20W recommended
- **Battery**: 10,000-50,000mAh lithium
- **Enclosure**: IP65-rated weatherproof housing
- **Expected Uptime**: 5-7 days with no sunlight

### Mains Power

For installations near electricity:

- **Voltage**: 110-240V AC
- **Power Supply**: 12V 2A minimum
- **Backup Battery**: Optional, 5000mAh for brief outages

---

## Antennas

### LoRa Antennas

- **Frequency**: 868 MHz (EU) or 915 MHz (US) as appropriate
- **Gain**: 2-5 dBi recommended
- **Mounting**: Vertical polarization for optimal range
- **Cable**: Low-loss LMR-240 or better for long runs

### Placement Tips

- **Height**: Maximum height practicable (roof, tower, tree)
- **Obstruction**: Minimize obstacles in main coverage area
- **Grounding**: Proper grounding for lightning protection
- **Cable Loss**: Keep antenna cable runs short (< 50 feet)

---

## GPS Modules

Optional for location-aware features:

- **Type**: u-blox M8N or compatible
- **Accuracy**: ±2.5m typical
- **Acquisition**: 5-30 seconds cold start
- **Power**: 50mA typical

---

## Costs and Sourcing

### Budget Breakdown (Single Node)

- LoRa Radio Device: $100-300
- Power Supply: $50-150
- Antenna & Cabling: $30-80
- Enclosure & Mounting: $50-150
- **Total**: $230-680 per node

### Where to Buy

- [RAK Wireless Official Store](https://store.rakwireless.com/)
- Authorized resellers (check RAK website)
- DIY suppliers for solar/power components

---

## Maintenance

### Regular Checks

- Visual inspection monthly (corrosion, physical damage)
- Power system test quarterly
- Firmware updates as released
- Log monitoring for errors

### Seasonal Maintenance

- **Winter**: Check battery performance, clear snow/ice from antenna
- **Spring**: Inspect for water damage, check grounding
- **Summer**: Monitor temperature, check power draw
- **Fall**: Clear leaves/debris, prepare for winter

---

## Advanced Topics

### Frequency Coordination

Work with local radio communities for optimal channel allocation:

- US: 915 MHz ISM band (915-928 MHz)
- Europe: 868 MHz ISM band (865-870 MHz)

### Link Budget Calculations

For range prediction: Distance = 10^((EIRP - ReceiverSensitivity + 20*log10(c/(4πf))) / (20))

Where:
- EIRP: Effective Isotropic Radiated Power (dBm)
- Receiver Sensitivity: -137 dBm typical for LoRa
- f: Frequency in Hz
- c: Speed of light

### Interference Management

- Monitor channel occupancy
- Plan frequency assignments with other users
- Use lower transmit power to reduce interference
- Document spectrum usage

---

For specific hardware recommendations for your location or use case, please ask in the [Discord community](https://discord.com/channels/1280671076644425749/1280693593002082436).
