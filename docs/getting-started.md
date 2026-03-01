---
title: Getting Started
subtitle: Everything you need to join the BexleyMesh community network
---

# Getting Started with BexleyMesh

Welcome! This guide will help you join the BexleyMesh community network.

## What You Need

- A compatible LoRa radio device (see Hardware Compatibility below)
- A computer with USB access for firmware flashing
- Basic familiarity with terminal/command line (optional)

## Hardware Compatibility

The following devices are confirmed compatible with MeshCore:

- **RAK3272S** - Small handheld transceiver (Recommended for beginners)
- **RAK4631** - More powerful module for fixed installations
- **RAK19007** - Gateway/repeater class device
- **Other LoRa32 modules** - May work with configuration adjustments

## Installation Steps

1. **Flash Firmware**
   - Visit [MeshCore Flasher](https://flasher.meshcore.co.uk/)
   - Select your device and latest firmware
   - Follow the on-screen instructions

2. **Configure Device**
   - Connect via USB serial
   - Enter configuration mode
   - Set your node name and position
   - Enable MQTT if desired for hybrid mode

3. **Join the Network**
   - Power on your device
   - Wait 30-60 seconds for initial sync
   - Check coverage map for your node

## Troubleshooting

**Device not detected**: Try different USB cable or port. Check device drivers.

**Firmware won't flash**: Update your device drivers or try a different computer.

**Node not appearing on map**: Check serial logs for errors. Verify network formation with other nodes.

## Next Steps

- Read the [Getting Started Guide Blog Post](post.html?slug=2026-02-10-getting-started) for detailed setup
- Join the [Discord community](https://discord.com/channels/1280671076644425749/1280693593002082436)
- Check out the [Coverage Map](https://meshcolumb.us/)

For more detailed information, see the [MeshCore Documentation](https://meshcore.co.uk/docs/).
