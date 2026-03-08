---
title: Getting Started
subtitle: Everything you need to join the BexleyMesh community network
---

# Getting Started with BexleyMesh

Getting started with Meshcore is incredably simple.  No subscriptions.  No registration.  No memberships.  All you need is a compatible device to receive and transmit messages, and the companion app for Android or IOS.

## What You Need

 1. A compatible LoRa radio device
 2. A computer with USB access for firmware flashing
 3. The companion app on an Android or IOS device

## Hardware Selection

There are lots of options for hardware.  A Google search for "Lora", "Meshcore", or "Meshtastic" device will provide many options.

 - The [Heltec v3](https://www.amazon.com/Meshnology-Module-Antenna-3000mAh-Battery/dp/B0FC6B7B67/ref=sr_1_6) is a popular choice for people just starting out. It's relaible and easy to work with.  Two considerations with the Heltec boards are that they do not have a GPS receiver and they are known to be a little power hungry.  So, battery life isn't the best.  This is a common complaint across any of these ESP32 based boards.  Another things to consider is that many Meshcore devices will arrive with assembly required.  You shouldn't let this scare you too much though. It's a straight-forward process to put the pieces together.
 - If the prospects assembling one of these devices is not your cup of tea, you can look for a fully assembled deivce, like the the [Wio Tracker L1](https://www.amazon.com/gp/aw/d/B0FNCS5ST1/) or the the [SenseCAP T1000-E](https://www.amazon.com/gp/aw/d/B0DJ6KGXKB).  While these devices are slightly more expensive, they come assembled and ready to flash with the Meshcore firmware and have GPS built in.  Additionally, they are built on the nRF52840 chipset, which is considerably more efficient and will last longer on a single charge.
 - If you are feeling really adventurous or like experimenting with electronics, you could conside the [Wisblock RAK19007](https://www.amazon.com/RAKwireless-WisBlock-Meshtastic-Starter-RAK19007/dp/B0CHKZJK9C/ref=sr_1_3).  This development board is a great platform for building out a custom LoRa devices.  There are a variety of sensors modules that can be added to the baseboard to meet your neets.  Just come ready to figure out how you are going to build, power, and house your components.

## Installation Steps

1. **Flash Firmware**
   - Connect your device to your computer with a USB cord
   - Visit [MeshCore Flasher](https://flasher.meshcore.co.uk/?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink)
   - Select your device from the list of available firmwares
   - Select Companion Bluetooth - assuming this is your first device and you plan to use it with your phone
   - Check the "Erase Device" checkbox if this is your first time installing the Meshcore firmware
   - Click the "Flash!" button

2. **Configure Device**
   - Download the Meshcore companion app
    - [<i class="fa-brands fa-android"></i> Android](https://play.google.com/store/apps/details?id=com.liamcottle.meshcore.android)
    - [<i class="fa-brands fa-app-store-ios"></i> IOS](https://apps.apple.com/gb/app/meshcore/id6742354151)
   - Connect to the device from within the app.  If you device has a screen, it should show the Bluetooth pin you need to enter.  If your device doesn't have a screen, the pin is probably 123456, but you may need to check the documentation for your individual device.
   - Set your node name and position
   - Set the Radio Settings to the recommended USA/Canada settings

With all that done, you should be ready to start messaging.

## Troubleshooting
 - [Check out the Meshcore Wiki Page for FAQ's](https://github.com/meshcore-dev/MeshCore/blob/main/docs/faq.md)
 - [Connect with us on our Discord to ask for help](https://discord.com/channels/1280671076644425749/1280693593002082436)

## Next Steps

 - Join the [<i class="fa-brands fa-discord"></i> Discord community](https://discord.com/channels/1280671076644425749/1280693593002082436) and start connecting with other Meshcore users across Central Ohio.
 - Check out the [Coverage Map](https://cmh.meshmapper..net) to check network coverage around the Columbus Metro Area.

For more detailed information, see the [MeshCore](https://meshcore.co.uk/) website for information about the project.
