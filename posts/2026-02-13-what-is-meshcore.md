---
title: What the heck is Meshcore and why did we start building the network?
date: 2026-02-13
author: DavidJay
tags: Project Update
excerpt: I went looking for a way for my kids to communicate with their friends and found a new hobby.
---

# Why did I start this project?
I have young kids.  Young enough that we don't want them having cell phones yet, but we do want them to have some independence of movement and communication with their friends.  We are fortunate enough to live in Bexley, where everything is walkable or bikeable and we feel comfortable with them moving around town solo.  This has been fine with walking to and from school or riding their bike to the library, but we haven't made the leap yet of letting them just show up at a friends house without the parents needing to be in the loop to ask if it's alright.  

I wanted to find a solution to the communication problem that would allow the kids to handle the asking permission on their own.  Ideally, the solution would also have some ability to monitor the kids' locations as they move around town.  My eldest has used a Garmin Bounce for a couple years, and that has been great for use to communicate with her while she's out.  Unfortunately, the Bounce requires a celluar plan and it doesn't enable her to communicate with friends.  I wanted something that wouldn't require their friends to also purchase an expensive piece of tech or pay for a subscription.  

## Project Requirements 
  1. The tool must be simple enough for an elementary school kid to use and a non-tech oriented parent to setup.
  2. The cost of getting started must be as low as possible.
  3. It shouldn't require much administrative effort to maintain the tool.

# Discovering Meshcore
While looking for a solution to my problem, I came across mesh networks.  This technology uses a portion of the RF spectrum that the FCC does not limit usage of through licensing or fees.  There are a number of different protocols that have taken advantage of this spectrum and I landed on Meshcore for a few reasons.
  - There was an active community in Central Ohio that I could learn from.
  - Other protocols had issues as they scaled up with more users.
  - The community developing the tools and apps around [Meshcore<i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>](https://meshcore.co.uk/?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink) was very active and the technology was improving quickly.

# Setting up my first device.
Getting started with Meshcore was remarkably easy.  After a little reading on [Meshcore's Project Website<i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>](https://meshcore.co.uk/?utm_source=BexleyMesh&utm_medium=web&utm_campaign=crosslink) I felt comfortable enough to jump on Amazon and purchase a [couple of the cheapest devices I could find<i class="fa-solid fa-arrow-up-right-from-square text-xs ml-1 opacity-70"></i>](https://www.amazon.com/ESP32-V3-Module-3000mAh-Battery/dp/B0F4XCXPPN/ref=sxbs_pa_sp_search_thematic_btf_sspa) to experiment with.  Do not buy the pair I linked here.  It turned out that the cases that came with this set do not fit the batteries.  If you are thinking about picking up your own devices, please pop over to our [Getting Started](page.html?page=getting-started) page for some recommendations.

After flashing my new devices and installing the companion app on my phone, I was pretty blown away at the simplicity of their use and the range that these little devices had.  With my experimentation being a success, I decided to take the next steps and put a repeater up to expand the range and reliability of the network coverage.

