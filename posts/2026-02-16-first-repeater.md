---
title: Built my first repeater!
date: 2026-02-16
author: DavidJay
tags: Hardware, Project Update
excerpt: Now that I have some companion devices, I need a repeater to extend their range.
---

# Why do we need a repeater?
If mesh networks are designed to allow direct communications without the need for a centralized distribution network, why do we need to build a repeater?  If we had selected a different protocol like Meshtastic, we wouldn't have needed a repeater.  One of the major problems with the Meshtastic approach is the overloading of the network with traffic because every device repeats every message.  This issue has led to dropped messages and unreliability of Meshtastic networks as they grow.  Meshcore avoids this issue by relying on a network of repeaters to handle the "flood" transmissions while still allowing for direct communications between individuals if they are within range.

Another benefit of a repeater is that you can place it in a static location, which preferably is as high as you can get it.  This strategic placement of repeaters provides better coverage around the repeater for the individual users while also helping to integrate the local network with other repeaters further away.

# Hardware
Please do not take the following as a guide for building your own repeater.  While I have some experience with electronics, I am a total noob when it comes to RF.  The repeater has been working really well since I built it and I think what I built would be a good first repeater for someone looking to learn the tech, but I definitely have some lessons learned that I outline at the bottom of this post and I hope to implement them on my next build as I continue to learn.

## LoRa Board 
I chose this board because of its low power consumption and wide use by others online building LoRa repeaters.
  - [WisBlock RAK19007 + RAK4631](https://www.amazon.com/dp/B0CHKZJK9C) 

## Antenna
I went with a Type N antenna due to the outdoor rating of the connection.  I chose the 5.8dBi version as a middle ground between coverage immediately around the repeater and trying to push the signal out to connect to other repeaters outside of Bexley.  Unfortunately, the connections to repeaters downtown and Linden have been spotty at best, but this is likely more to do with the height of the antenna than the dBi rating.
 - [915MHz 5.8dBi Type N Antenna](https://www.amazon.com/dp/B09N2H166D)

## Solar Panel 
I didn't do any power consumption calculations or anything when I chose this particular panel.  I just knew that I wanted a 5v panel and 9w was bigger than what I saw recommended from a few sources online.  My thought was that I would go big for my first repeater and track how the battery does.  So far, this sized panel has been just right for Central Ohio in February/March and the battery has hovered around 75% since the repeater was installed.
  - [Generic 9w 5v Outdoor Panel](https://www.amazon.com/dp/B0F3XB6G1N)

## Power Management 
The TP4056 is a great little power management board that handles taking the power in from the solar panel and distributing it to the battery and LoRa board.  The RAK board has a solar power management circuit with overcharging protection, but it does not have over-voltage protection.  So there is a chance that the solar panel could feed a voltage greater than the max 5.5v the RAK19007 is rated for and cook the board.
  - [TP4056](https://www.amazon.com/dp/B0C2VD3ZW3)

## Battery 
Most repeater builds I've seen online have used something closer to a 3,000mAh battery.  As with the solar panel, I decided to go big for my first build and see how it performs.  I definitely think that the size could be reduced for the next build, but I'm also exploring other chemistries for v2, which I explore in the planned changes section below.
  - [MakerFocus 3.7v 10,000mAh LiPo](https://www.amazon.com/dp/B093WS6C66)

## Hardware
One pleasant surprise with the enclosure I picked is that it has standard mounting points on the back for a 1" plastic conduit hanger.  When paired with the 1" conduit used as the mast, it was a piece of cake to mount the enclosure to the pipe and the pre-built mounting points meant that no extra penetrations of the box were necessary.  You'll see in the pictures below the hardware I used for mounting the mast to the wall.  Those are nothing special and just standard hardware from the big box store.
 - [Generic 6"x4"x3" Weatherproof Enclosure](https://www.amazon.com/dp/B093WS6C66)
 - [1" x 10' Schedule 40 Plastic Conduit](https://www.lowes.com/pd/CANTEX-Common-1-in-Actual-1-In-Non-Metallic-Pvc-10-ft-Conduit/50434246)

![](posts\photos\repeater-electronics.jpg)

# Coverage Results
When I first built the repeater, I stuck it on the 10' conduit in my yard.  I wanted to ensure everything was working before I went to the effort of mounting it to the roof.  Even at only 10' off the ground, I was quite impressed with the results.  After about a week of use without any issue, I took the leap and mounted it to the roof.  The new position is about 28' off the ground and the extra height increased the coverage area by about 50%.

![Results from the ground position](posts\photos\v1-results-before.png)
![Results from mounting it to the roof](posts\photos\v1-results-after.png)

At the LoRa frequencies, the devices rely on line of sight to transmit their messages.  You get some benefit from the RF bouncing around the environment to extend the range past true line of sight, but every bounce takes energy out of the signal.  To really extend the range, you need to get the antenna as high as you can.  Preferably above the tree line.  Here is the final installation.

![](posts\photos\antenna-mast-v1-1.jpg)
![](posts\photos\antenna-mast-v1-2.jpg)
![](posts\photos\antenna-mast-v1-3.jpg)


# Specific changes planned for v2
  - Use an aluminum enclosure to shield the LoRa board from external RF noise
  - Provide a ground path for surge protection from nearby lightning and static bleed-off from static charge that could build up on the antenna in the wind.  This will include a lightning arrestor in line with the antenna cable before it enters the enclosure.
  - Use metal conduit for the mast rather than the plastic one used for v1.  The plastic seems to be holding up, but as I build repeaters that will be installed at sites that are not my house, I want the hardware to be 100% rock solid.
  - Place the enclosure at the bottom of the mast and use a LMR-400 cable to connect the antenna at the top of the mast.  The power loss through a high quality cable is not incredibly high and the benefit of having the enclosure at the bottom of the mast outweighs the lost signal strength from the cable.  Especially if I am able to put up a 20' or even 30' mast.
  - Switch to a 12v LiFePO4 chemistry battery and a real solar power management device with a step-down converter to ensure a reliable 5v power source for the electronics.  Additionally, a LiFePO4 battery will handle the freezing temperatures of Central Ohio during winter better than a Li-ion battery would.
