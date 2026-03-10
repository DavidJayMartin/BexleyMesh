---
title: Built my first repeater!
date: 2026-02-16
author: DavidJay
tags: Hardware, Project Update
excerpt: Now that I have some companion devices, I need a repeater to extend their range.
---

# Why do we need a repeater?
If mesh networks are designed to allow direct communications without the need for a centralized distribution network, why do we need to build a repeater?  If we had selected a different protocol like Meshtastic, we wouldn't have needed a repeater.  One of the major problems with the Mestasitic approach is the overloading of the network with traffic because every device repeaters every message.  This issue has lead to dropped message and unreliability of Mestastic networks as they grow.  Meshcore avoids this issue by relying on a network of repeaters to handle the "flood" transmissions while still allowing for direct communications between individuals if they are within range.

Another benefit of a repeater is that you can place it in a static location, which preferably is as high as you can get it.  This strategic placement of repeaters provides better coverage around the repeater for the individual users while also helping to integrate the local network with other repeaters further away.

# Hardware
Please do not take the following as a guide for building your own repeater.  While I have some experience with eletronics, I am a total noob when it comes to RF.  The repeater has been working really well since I built it and I think what I built would be a good first repeater for someone looking to learn the tech, but I definitely have some lessons learned that I outline at the bottom of this post and I hope to implement them on my next build as I continue to learn.

## LoRa Board 
I chose this board because of it's low power consumption and
  - [WisBlock RAK19007 + RAK4631](https://www.amazon.com/dp/B0CHKZJK9C) 

## Antenna
 - [915MHz 5.8dBi Type N Antenna](https://www.amazon.com/dp/B09N2H166D)

## Solar Panel 
  - [Generic 9w 5v Outdoor Panel](https://www.amazon.com/dp/B0F3XB6G1N)

## Power Management 
  - [TP4056](https://www.amazon.com/dp/B0C2VD3ZW3)

## Battery 
  - [MakerFocus 3.7v 10,000mAh LiPo](https://www.amazon.com/dp/B093WS6C66)

## Hardware
 - [Generic 6"x4"x3" Weatherproof Enclosure](https://www.amazon.com/dp/B093WS6C66)
 - [1" x 10' Schedule 40 Plastic Conduit](https://www.lowes.com/pd/CANTEX-Common-1-in-Actual-1-In-Non-Metallic-Pvc-10-ft-Conduit/50434246)

# Coverage Results
When I first built the repeater, I stuck it on the 10' conduit in my yard.  I wanted to ensure everything was working before I went to the effort of mounting it to the roof.  Even at only 10' off the ground, I was quite impressed with the results.  After about a week of use without any issue, I took the leap and mounted it to the roof.  The new position is about 28' off the ground and the extra height increased the coverage area by about 50%.

![Results from the ground position](posts\photos\v1-results-before.png)
![Results from mounting it to the roof](posts\photos\v1-results-after.png)

At the LoRa frequencies, the devices rely on line of sight to transmit their messages.  You get some benefit from the RF bouncing around the environment to extend the range past true line of sight, but every bounce takes energy out of the signal.  YOu really extend the range, you need to get the antenna as high as you can.  Preferrably above the tree line.  Here is the final installation.

![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)
![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)
![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)
![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)
![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)

# Lessons Learned
We are currently planning the second repeater deployment for early March. If you are interested in hosting a repeater node on your property or business, please reach out via Discord or email.

Thank you to everyone who contributed to making this deployment a success!
