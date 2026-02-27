# Contributing to BexleyMesh

Thank you for your interest in contributing to the BexleyMesh project! This document provides guidelines and instructions for various ways you can help.

## Ways to Contribute

### 1. Writing Blog Posts and Documentation

**How to add a blog post:**

1. Create a new markdown file in the `posts/` directory
2. Name it with format: `YYYY-MM-DD-slug.md`
3. Include YAML front-matter with metadata:

```markdown
---
title: Your Post Title
date: 2026-02-27
author: Your Name
tags: Category1, Category2
excerpt: A brief summary of your post (150 chars max)
---

# Your Post Content

Write your content in markdown format...
```

4. Update `data/posts-manifest.json` to include your new post filename
5. Submit a pull request with your changes

**Post categories:**
- Hardware: Repeater deployments, equipment reviews
- Guides: How-to guides, tutorials, setup instructions
- Announcements: Project updates, network milestones
- Community: Community events, member spotlights

### 2. Improving Documentation

Documentation lives in the `docs/` directory. You can:

- Update existing guides for clarity
- Fix typos and errors
- Add new documentation topics
- Improve accessibility and readability
- Add diagrams or visual aids

### 3. Code Contributions

### JavaScript/Frontend
- Improve blog post rendering
- Enhance markdown parser
- Add new website features
- Optimize performance
- Fix bugs

### Python Scripts
- Improve repeater status polling script
- Add error handling and logging
- Enhance MQTT connectivity
- Add data processing features

### 4. Hardware and Deployment

- Test new hardware configurations
- Deploy repeater nodes
- Document hardware setups
- Report hardware compatibility issues
- Share deployment experiences

### 5. Community Support

- Answer questions in Discord
- Help troubleshoot issues
- Welcome new members
- Moderate discussions
- Share your expertise

## Development Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/DavidJayMartin/BexleyMesh.git
cd BexleyMesh
```

2. Start a local web server:
```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx http-server
```

3. Open http://localhost:8000 in your browser

### Python Environment Setup

For working with scripts:

```bash
# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install paho-mqtt requests
```

## Coding Standards

### JavaScript
- Use vanilla JavaScript (no frameworks for static site)
- Use meaningful variable and function names
- Add comments for complex logic
- Test in modern browsers (Chrome, Firefox, Safari, Edge)
- Follow existing code style

### Python
- Follow PEP 8 style guide
- Use type hints where practical
- Include docstrings for functions
- Handle errors gracefully
- Add logging for debugging

### Markdown
- Use clear, concise language
- Format code blocks with syntax highlighting
- Include links to related resources
- Use headers hierarchically (don't skip levels)
- Keep line length reasonable for readability

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: Add blog post parsing for code blocks
fix: Correct repeater status display formatting
docs: Update installation instructions
style: Improve CSS for mobile responsiveness
refactor: Simplify markdown parser
```

Prefix with: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Create a Pull Request with description of changes
8. Wait for review and address feedback

## Reporting Issues

Found a bug or have a suggestion?

1. Check existing issues to avoid duplicates
2. Create a new issue with clear description
3. Include steps to reproduce (for bugs)
4. Add screenshots if relevant
5. Specify your browser/environment

## Code Review

All contributions go through code review:

- Be respectful and constructive
- Assume good intent
- Ask questions for clarification
- Suggest improvements, don't demand changes
- Acknowledge good work

## License

By contributing, you agree that your contributions will be licensed under the same license as the project. See LICENSE file for details.

## Getting Help

- **Discord**: [Ask in our community](https://discord.com/channels/1280671076644425749/1280693593002082436)
- **GitHub Issues**: Ask questions in issue threads
- **Email**: Check project admin contact info

## Recognition

Contributors are recognized in:
- Git commit history
- CONTRIBUTORS.md file
- Discord contributor role
- Website acknowledgments

## Code of Conduct

### Expected Behavior
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Be patient and kind
- Focus on what's best for the community
- Give credit to others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insults
- Spam or self-promotion
- Sharing others' private information
- Other unethical conduct

Violations will result in removal from the project.

## Questions?

Not sure about something? Ask!

- Open a discussion in GitHub
- Ask in Discord
- Comment on relevant issues
- Reach out to project maintainers

We're here to help and want to make contributing as easy as possible.

---

**Thank you for contributing to BexleyMesh!**

Together, we're building resilient communication infrastructure for our community.
