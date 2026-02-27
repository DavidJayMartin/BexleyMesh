# BexleyMesh

A community project to build out a Meshcore network in Bexley, Ohio.

## Overview

BexleyMesh is a community-driven initiative to deploy a resilient, off-grid mesh communication network using LoRa radio technology. This repository contains the website and documentation for the project.

**Website**: [bexleymesh.org](https://bexleymesh.org)  
**Discord**: [Join our community](https://discord.com/channels/1280671076644425749/1280693593002082436)  
**GitHub**: [Project Repository](https://github.com/DavidJayMartin/BexleyMesh)

## What is MeshCore?

MeshCore is an open-source firmware platform that transforms low-cost LoRa radios into mesh-networked communication devices. Unlike traditional communication infrastructure that depends on cellular networks or the internet, a mesh network allows devices to communicate directly with each other and relay messages across larger distances through multiple nodes.

### Key Features

- **Off-Grid Communications**: Works without cellular or internet infrastructure
- **Long Range**: Up to 20km line-of-sight between nodes
- **Low Power**: Battery-powered operation for days or weeks
- **Privacy**: Messages stay within the community network
- **Resilient**: Automatic path finding and rerouting
- **Open Source**: Free to use and modify

## Why MeshCore over Meshtastic?

While both are excellent mesh networking projects, MeshCore offers:

- **Hardware Flexibility**: Support for professional-grade gateway hardware (RAK19007)
- **MQTT Integration**: Hybrid cloud connectivity for advanced use cases
- **Gateway Performance**: Higher capacity for larger networks
- **Community Focus**: Emphasis on community infrastructure deployment
- **Professional Features**: Designed for emergency response and critical infrastructure

## Project Status

### Current State (Feb 2026)

- ✅ Website launched with blog and documentation
- ✅ Infrastructure planning completed
- 🚀 Phase 1: Foundation (in progress)
- 🔜 Phase 2: Dynamic features (planned)
- 🔜 Phase 3: Polish & Launch (planned)

### Active Nodes

Currently deploying initial network infrastructure:

1. **North Ridge Repeater** - RAK19007 solar node (Active)
2. **Downtown Node** - RAK4631 gateway (Active)
3. **Park Node** - RAK3272S portable (Testing)

Check the [live coverage map](https://meshcolumb.us/) for real-time network status.

## Getting Started

### For Users

1. **Learn**: Read the [Getting Started Guide](docs/getting-started.md)
2. **Get Hardware**: Purchase a compatible LoRa device
3. **Flash Firmware**: Use the [MeshCore Firmware Flasher](https://flasher.meshcore.co.uk/)
4. **Configure**: Set up your device and join the network
5. **Participate**: Join the [Discord community](https://discord.com/channels/1280671076644425749/1280693593002082436)

### For Contributors

Interested in helping with the project?

- **Content**: Add blog posts, documentation, and guides
- **Code**: Contribute to the website or scripts
- **Hardware**: Host a repeater node or test equipment
- **Community**: Help moderate Discord and support new users

## Repository Structure

```
├── index.html                  # Homepage
├── blog.html                   # Blog listing page
├── post.html                   # Individual post viewer
├── posts/                      # Blog post markdown files
├── docs/                       # Documentation pages
├── data/                       # Data files (posts manifest, repeater status)
├── css/                        # Stylesheets
├── js/                         # JavaScript utilities
├── scripts/                    # Utility scripts (Python, etc.)
├── .github/
│   ├── workflows/              # GitHub Actions workflows
│   └── chatmodes/              # AI development modes
└── plan.md                     # Project plan
```

## Development

### Local Testing

The website is built with static HTML, CSS, and JavaScript. To test locally:

```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server

# Then visit: http://localhost:8000
```

### Blog Post Format

Blog posts are written in Markdown with YAML front-matter:

```markdown
---
title: Post Title
date: 2026-02-14
author: Your Name
tags: Tag1, Tag2
excerpt: Brief summary of the post
---

# Post Content

Your markdown content here...
```

Save files in `posts/` directory with format: `YYYY-MM-DD-slug.md`

Update `data/posts-manifest.json` to include new posts.

### Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Font Awesome (CDN)
- **Markdown**: Custom parser for blog posts
- **Hosting**: GitHub Pages
- **Automation**: GitHub Actions
- **Backend Data**: Python scripts for MQTT polling

## Planning and Testing

The project follows a phased development approach:

- **Phase 1**: Foundation (repository structure, blog infrastructure, homepage)
- **Phase 2**: Dynamic features (repeater status, live updates)
- **Phase 3**: Polish & launch (testing, optimization, deployment)
- **Phase 4**: Future enhancements (analytics, mobile apps, advanced features)

See `plan.md` and `tasks.md` for detailed project plans.

## Hardware Recommendations

### For Beginners

- **RAK3272S**: Small, portable, affordable ($100-150)
  - Perfect for learning and testing
  - Pocket-sized with good range
  - Battery powered (5+ hours)

### For Infrastructure

- **RAK4631**: Modular, professional ($150-250)
  - Field deployments
  - Sensor integration capability
  - Better range than portable units

### For Network Hubs

- **RAK19007**: Gateway-class repeater ($250-400)
  - Solar-powered operation
  - Long-range coverage
  - High message capacity
  - Professional mounting

See [Hardware Guide](docs/hardware-guide.md) for detailed specifications.

## Community

### Discord Server

Join our Discord community for:
- Real-time chat with other members
- Technical support and troubleshooting
- Hardware discussions
- Network deployments
- Project announcements

[Join Discord](https://discord.com/channels/1280671076644425749/1280693593002082436)

### Contributing

We welcome contributions! Ways to help:

1. **Documentation**: Improve guides and add new content
2. **Testing**: Help test firmware and hardware configurations
3. **Development**: Contribute code or scripts
4. **Outreach**: Help promote the project in your community

### Code of Conduct

Our community values:
- Respect and inclusivity
- Technical honesty
- Collaborative problem-solving
- Respect for others' time and expertise

## Technical Details

### Network Architecture

- **Topology**: Self-healing mesh network
- **Frequency**: 915 MHz (US) or 868 MHz (EU)
- **Modulation**: LoRa long-range spread spectrum
- **Range**: 5-20km depending on hardware and terrain
- **Capacity**: 1000+ nodes per network

### Data Flow

1. User devices send messages to nearest node
2. Messages hop through network to destination
3. MQTT broker optionally bridges to external systems
4. Status data sent to central coordinator
5. Dashboard updates display live network status

## Links and Resources

- **MeshCore Project**: https://meshcore.co.uk/
- **Central Ohio Mesh**: https://meshcolumb.us/
- **LoRa Alliance**: https://lora-alliance.org/
- **RAK Wireless**: https://rakwireless.com/
- **GitHub**: https://github.com/DavidJayMartin/BexleyMesh

## License

This project is open source. The website content, documentation, and code are available under appropriate open source licenses. Please see individual files for specific license information.

## Contact

- **Discord**: [BexleyMesh Community](https://discord.com/channels/1280671076644425749/1280693593002082436)
- **GitHub Issues**: [Report bugs or request features](https://github.com/DavidJayMartin/BexleyMesh/issues)
- **Email**: Check GitHub profile for contact information

---

**Last Updated**: February 27, 2026  
**Project Status**: Phase 1 - Foundation (In Progress)
