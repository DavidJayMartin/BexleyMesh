---
title: Getting Started with MeshCore Agents
date: 2026-02-10
author: Admin
tags: Guides, Hardware
excerpt: A step-by-step guide to configuring your first MeshCore agent and connecting to the local MQTT broker for hybrid connectivity.
---

# Getting Started with MeshCore Agents

Welcome to the BexleyMesh network! This guide will walk you through setting up your first MeshCore agent device and connecting it to our community MQTT broker.

## What You'll Need

- A compatible LoRa radio device (RAK3272S, RAK4631, or similar)
- A microSD card (optional, for configuration storage)
- USB-C cable for programming
- About 30 minutes of your time

## Step 1: Flash the Firmware

1. Go to the [MeshCore Firmware Flasher](https://flasher.meshcore.co.uk/)
2. Select your device model from the dropdown
3. Choose the latest stable firmware version
4. Connect your device via USB
5. Click "Flash" and wait for completion

## Step 2: Configure Your Device

Once flashing is complete, you'll need to configure the device:

1. Connect to the serial console (9600 baud)
2. Use the command `config` to enter configuration mode
3. Set your node name: `config set name YourNodeName`
4. Set your position (optional): `config set lat 40.1234 lon -82.9876`
5. Save configuration: `config save`

## Step 3: Connect to MQTT (Hybrid Mode)

To enable hybrid connectivity with our MQTT broker:

1. In configuration mode, set: `config set mqtt enabled`
2. Set broker address: `config set mqtt.host mqtt.meshcommunity.net`
3. Set MQTT port: `config set mqtt.port 1883`
4. Save and reboot: `config save; reboot`

## Verification

You should see your node appear in the network within 2-3 minutes. You can verify:

- Check the live repeater status on the homepage
- Monitor MQTT topics: `meshcore/nodes/+/status`
- View coverage map at [Central Ohio Mesh](https://meshcolumb.us)

## Troubleshooting

**Device not appearing**: Check that firmware flashing completed without errors. Try a factory reset with `reset factory`.

**No MQTT connection**: Verify network connectivity and broker address. Check serial logs with `log level debug`.

**Poor reception**: Try repositioning your antenna vertically or moving to a higher location.

## Getting Help

If you run into issues:

1. Check the [MeshCore FAQ](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
2. Ask in the [Discord #hardware channel](https://discord.com/channels/1280671076644425749/1280693593002082436)
3. File an issue on [GitHub](https://github.com/meshcore-dev/MeshCore/issues)

Happy meshing!
