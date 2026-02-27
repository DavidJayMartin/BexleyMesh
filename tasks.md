# BexleyMesh Development Tasks

## Phase 1: Foundation

### Setup & Infrastructure

#### Task 1.1: Initialize Repository Structure
- **Description**: Create directory structure and scaffold files for the project
- **Effort**: Small
- **Dependencies**: None
- **Technical Details**:
  - Create `/posts/` directory for blog markdown files
  - Create `/data/` directory for JSON data files
  - Create `/docs/` directory for documentation
  - Create `/css/` and `/js/` directories for assets
  - Create `.github/workflows/` directory structure
  - Create `/scripts/` directory for automation scripts
- **Success Criteria**:
  - All directories exist and are properly structured
  - Directory layout matches architecture plan
  - `.gitignore` properly configured for generated files
- **Notes**: This should be one of the first tasks completed

#### Task 1.2: Set Up Tailwind CSS & Font Awesome Integration
- **Description**: Configure CDN links for styling and icons
- **Effort**: Small
- **Dependencies**: None
- **Technical Details**:
  - Add Tailwind CSS CDN link to HTML head
  - Add Font Awesome CDN link to HTML head
  - Verify both libraries load correctly
  - Create `/css/custom.css` for any custom styling beyond Tailwind
- **Success Criteria**:
  - Tailwind classes work in HTML pages
  - Font Awesome icons display correctly
  - No console errors related to CSS/icon loading
- **Notes**: Both libraries already implemented via CDN according to plan

#### Task 1.3: Create Base HTML Template
- **Description**: Build reusable HTML template structure for all pages
- **Effort**: Medium
- **Dependencies**: Task 1.2
- **Technical Details**:
  - Create header/navbar component with navigation links
  - Create footer component with links and credits
  - Define common layout structure (container, spacing, responsive grid)
  - Add meta tags for SEO and responsiveness
  - Implement responsive navigation (mobile menu if needed)
- **Success Criteria**:
  - All pages use consistent header/footer
  - Layout is responsive and mobile-friendly
  - Navigation is clear and functional on desktop and mobile
  - WCAG 2.1 AA accessibility standards met for structure
- **Notes**: Should use semantic HTML5 elements

### Blog Infrastructure

#### Task 1.4: Implement Markdown to HTML Blog Post Parser
- **Description**: Create JavaScript functionality to parse and render blog posts from Markdown
- **Effort**: Large
- **Dependencies**: Task 1.3
- **Technical Details**:
  - Choose markdown parsing library (e.g., marked.js or markdown-it)
  - Create parser function that:
    - Reads markdown file content
    - Extracts YAML front-matter (title, date, tags, author)
    - Converts markdown body to HTML
    - Handles code blocks with syntax highlighting (if needed)
  - Implement front-matter parsing for metadata
  - Create JavaScript to fetch and render posts dynamically
- **Success Criteria**:
  - Markdown files parse correctly to HTML
  - YAML front-matter extracts properly
  - Blog post layouts are consistent and readable
  - Code blocks display correctly (if present)
- **Notes**: Consider using a library like marked.js or showdown.js for reliability

#### Task 1.5: Create Blog Listing Page (`blog.html`)
- **Description**: Build the blog archive/listing page showing all posts
- **Effort**: Medium
- **Dependencies**: Task 1.4
- **Technical Details**:
  - Fetch all blog posts from `/posts/` directory
  - Display posts in chronological order (newest first)
  - Show post metadata: title, date, author, excerpt, tags
  - Implement tag filtering/categorization
  - Add pagination if post count exceeds threshold (e.g., 10 per page)
  - Include search functionality (optional for Phase 1)
- **Success Criteria**:
  - All blog posts appear in listing
  - Posts sorted correctly by date
  - Tags are clickable and filter correctly
  - Page loads in < 3 seconds
  - Mobile responsive layout
- **Notes**: Consider accessibility for filtering and navigation

#### Task 1.6: Create Individual Blog Post Page Template
- **Description**: Build the template for displaying individual blog posts with full content
- **Effort**: Medium
- **Dependencies**: Task 1.4
- **Technical Details**:
  - Create dynamically-rendered page that loads specific post
  - Display full post content with proper formatting
  - Show metadata: title, date, author, tags
  - Add navigation (previous/next post links)
  - Add related posts section (optional for Phase 1)
  - Implement table of contents for longer posts (optional)
- **Success Criteria**:
  - Individual posts display with all content
  - Formatting is readable and professional
  - Metadata clearly visible
  - Navigation between posts works
  - Proper SEO meta tags for each post
- **Notes**: Ensure proper heading hierarchy for accessibility

#### Task 1.7: Create Initial Blog Posts & Documentation
- **Description**: Write sample blog posts and documentation pages to populate the site
- **Effort**: Medium
- **Dependencies**: Task 1.5, Task 1.6
- **Technical Details**:
  - Create 3-5 initial blog posts in `/posts/` (examples from plan):
    - "Getting Started with BexleyMesh"
    - "Hardware Setup Guide"
    - "Solar-Powered Repeater Deployment"
    - "Contributing to the Network"
  - Create documentation pages in `/docs/`:
    - Getting Started guide
    - Hardware compatibility guide
    - MQTT connection information
    - Firmware flashing instructions
  - Use consistent YAML front-matter format
  - Include relevant code examples where applicable
- **Success Criteria**:
  - At least 3 blog posts published and displaying correctly
  - Documentation pages are comprehensive and accurate
  - All markdown files follow consistent format
  - Content is professionally written and helpful
- **Notes**: Content should reflect community-focused, technical nature of project

### Homepage Development

#### Task 1.8: Create Homepage/Landing Page
- **Description**: Build the main landing page with hero section and key information
- **Effort**: Large
- **Dependencies**: Task 1.3
- **Technical Details**:
  - Create hero section with project tagline and call-to-action
  - Add section for live network statistics (placeholder for Phase 2)
  - Feature a "Latest Update" section linking to newest blog post
  - Create quick-access resource links section
  - Add social links (Discord, etc.)
  - Implement professional design reflecting technical + community focus
  - Ensure responsive design across all device sizes
- **Success Criteria**:
  - Homepage loads in < 3 seconds
  - Professional appearance suitable for stakeholder outreach
  - Clear value proposition for the project
  - All links functional and working
  - Mobile-responsive and accessible
- **Notes**: This is the first impression - make it count

### GitHub Actions & Workflow Setup

#### Task 1.9: Create GitHub Actions Workflow File Structure
- **Description**: Set up the GitHub Actions workflow configuration file
- **Effort**: Medium
- **Dependencies**: None
- **Technical Details**:
  - Create `.github/workflows/update-repeater-status.yml`
  - Configure workflow to:
    - Trigger on schedule (every 5 minutes using cron syntax)
    - Set up Python environment
    - Install dependencies (paho-mqtt)
    - Run repeater status script
    - Commit and push changes back to repository
  - Add error handling and notifications
  - Add secrets management for MQTT credentials
- **Success Criteria**:
  - Workflow file is syntactically correct
  - Can be triggered manually for testing
  - GitHub repository secrets configured for MQTT credentials
  - Workflow shows in Actions tab
- **Notes**: Ensure MQTT credentials are stored as GitHub secrets, not in code

#### Task 1.10: Create Python Script for Repeater Status Fetching
- **Description**: Develop Python script to query MQTT broker and generate JSON status
- **Effort**: Large
- **Dependencies**: Task 1.9
- **Technical Details**:
  - Create `/scripts/update_repeater_status.py`
  - Implement MQTT client connection to broker
  - Query repeater status topics/payloads
  - Parse response data into structured format
  - Generate JSON output to `/data/repeater-status.json`
  - Include error handling for:
    - Connection failures
    - Timeout scenarios
    - Invalid data responses
  - Add logging for debugging
  - Include timestamp of last update
- **Success Criteria**:
  - Script runs without errors
  - JSON output is valid and well-formatted
  - Includes all required repeater information
  - Script handles network failures gracefully
  - Can be run locally and in GitHub Actions environment
- **Notes**: Need MQTT broker credentials and topic information from project lead

---

## Phase 2: Dynamic Features

### Live Repeater Status Display

#### Task 2.1: Design Data Schema for Repeater Status JSON
- **Description**: Define the structure of the repeater status JSON file
- **Effort**: Small
- **Dependencies**: None
- **Technical Details**:
  - Define JSON schema including:
    - Repeater ID
    - Name/Location
    - Status (online/offline/unknown)
    - Last seen timestamp
    - Signal strength (if available)
    - Battery level (if solar-powered)
    - Location coordinates (optional)
  - Create example JSON file with sample data
  - Document schema in repository
- **Success Criteria**:
  - Schema is clear and extensible
  - Example JSON is valid
  - All necessary fields included
  - Easy to parse and display
- **Notes**: Schema should accommodate future enhancements

#### Task 2.2: Create Repeater Status Dashboard/Widget
- **Description**: Build frontend component to display live repeater status
- **Effort**: Large
- **Dependencies**: Task 1.8, Task 2.1
- **Technical Details**:
  - Fetch JSON from `/data/repeater-status.json`
  - Create visual display showing:
    - List or grid of repeaters
    - Status indicators (green/red/gray icons)
    - Last seen timestamp
    - Signal strength visualization (if available)
  - Implement auto-refresh (every 30-60 seconds)
  - Add loading states and error messages
  - Make responsive for mobile viewing
- **Success Criteria**:
  - Status updates automatically without page refresh
  - Visual indicators are clear and intuitive
  - Mobile-responsive display
  - Handles missing data gracefully
  - Updates in real-time every 5 minutes
- **Notes**: Consider caching to avoid constant fetches

#### Task 2.3: Add Live Network Statistics to Homepage
- **Description**: Calculate and display aggregate network statistics
- **Effort**: Medium
- **Dependencies**: Task 2.2
- **Technical Details**:
  - Calculate:
    - Total repeaters in network
    - Online repeaters count
    - Network uptime percentage
    - Last update timestamp
  - Display prominently on homepage hero section
  - Update dynamically when data refreshes
- **Success Criteria**:
  - Statistics calculate correctly from repeater data
  - Display is visually prominent
  - Numbers update when JSON is refreshed
  - Handles edge cases (no data, all offline, etc.)
- **Notes**: Statistics should be automatically calculated, not hardcoded

### Coverage Map Integration

#### Task 2.4: Embed Coverage Map Widget
- **Description**: Integrate the cmh.meshmapper.net coverage map into the site
- **Effort**: Small
- **Dependencies**: Task 1.3
- **Technical Details**:
  - Research embedding options for cmh.meshmapper.net
  - Create dedicated coverage map page or section
  - Implement responsive iframe or embed code
  - Add description and link to full map
  - Ensure map is mobile-friendly
- **Success Criteria**:
  - Map displays correctly and is interactive
  - Mobile responsive
  - Link to full map functional
  - Page loads without conflicts
- **Notes**: May need to coordinate with cmh.meshmapper.net team if custom embed needed

---

## Phase 3: Polish & Launch

### Testing & Optimization

#### Task 3.1: Cross-Browser & Device Testing
- **Description**: Comprehensively test site across browsers and devices
- **Effort**: Large
- **Dependencies**: All Phase 1 & 2 tasks
- **Technical Details**:
  - Test on browsers: Chrome, Firefox, Safari, Edge
  - Test on devices: Desktop, Tablet, Mobile (iOS & Android)
  - Use tools: BrowserStack, Chrome DevTools, Safari DevTools
  - Test all functionality:
    - Navigation and links
    - Blog post rendering
    - Dynamic content loading
    - Repeater status updates
    - Responsive layouts
  - Check for visual inconsistencies
  - Verify form submissions (if any)
- **Success Criteria**:
  - Site works correctly on all major browsers
  - Responsive design functions on all device sizes
  - No broken links or missing assets
  - Performance metrics meet targets
  - All interactive elements work as expected
- **Notes**: Document any browser-specific issues and fixes

#### Task 3.2: Accessibility Audit (WCAG 2.1 AA)
- **Description**: Ensure site meets WCAG 2.1 AA accessibility standards
- **Effort**: Medium
- **Dependencies**: All Phase 1 & 2 tasks
- **Technical Details**:
  - Use automated tools: axe DevTools, Lighthouse, WAVE
  - Manual testing:
    - Keyboard navigation (Tab, Enter, Escape)
    - Screen reader testing (NVDA, JAWS, or VoiceOver)
    - Color contrast checking
    - Focus indicators
  - Fix issues:
    - Alt text for images
    - Proper heading hierarchy
    - Form labels
    - ARIA attributes where needed
- **Success Criteria**:
  - Axe DevTools reports zero violations
  - Lighthouse accessibility score 90+
  - Keyboard navigation fully functional
  - Screen reader compatible
  - Color contrast meets WCAG AA standards
- **Notes**: Accessibility is not optional - it's a requirement

#### Task 3.3: Performance Optimization
- **Description**: Optimize site loading times and runtime performance
- **Effort**: Medium
- **Dependencies**: All Phase 1 & 2 tasks
- **Technical Details**:
  - Measure current performance with Lighthouse
  - Optimize:
    - Minimize CSS/JavaScript
    - Lazy load images
    - Cache strategies for static assets
    - CDN caching for Tailwind/Font Awesome
    - Reduce initial bundle size
  - Target metrics:
    - First Contentful Paint < 1.5s
    - Largest Contentful Paint < 2.5s
    - Cumulative Layout Shift < 0.1
    - Total page size < 1MB
- **Success Criteria**:
  - Lighthouse Performance score 80+
  - Page loads in < 3 seconds on standard broadband
  - All target metrics achieved
  - Mobile performance optimized
- **Notes**: Monitor performance in production after launch

#### Task 3.4: SEO Implementation
- **Description**: Optimize site for search engines
- **Effort**: Medium
- **Dependencies**: All Phase 1 & 2 tasks
- **Technical Details**:
  - Implement:
    - Meta descriptions for all pages
    - Open Graph tags for social sharing
    - Sitemap.xml generation
    - robots.txt file
    - Canonical tags
    - Structured data (JSON-LD) for articles
  - Verify meta tags with SEO tools
  - Submit sitemap to Google Search Console
  - Check for broken links and crawl errors
- **Success Criteria**:
  - All pages have unique, descriptive meta tags
  - Social sharing displays correctly
  - Sitemap includes all content
  - Google Search Console shows healthy crawl stats
- **Notes**: Good SEO helps with community discovery

### Content Review & Documentation

#### Task 3.5: Final Content Review & Copy Editing
- **Description**: Review all content for accuracy, clarity, and professionalism
- **Effort**: Medium
- **Dependencies**: Task 1.7, Task 1.8, Task 2.2
- **Technical Details**:
  - Review all blog posts for:
    - Grammar and spelling
    - Accuracy of technical information
    - Tone consistency
    - Links validity
  - Review documentation for:
    - Completeness
    - Clarity for target audience
    - Accuracy of instructions
  - Verify all external links are current
  - Ensure terminology is consistent
- **Success Criteria**:
  - No grammatical errors
  - All information is accurate
  - Professional tone throughout
  - All links are functional
  - Content is helpful and clear
- **Notes**: Have at least one other person review for fresh perspective

#### Task 3.6: Create Comprehensive README & Contributing Guide
- **Description**: Document the project structure and contribution guidelines
- **Effort**: Medium
- **Dependencies**: All Phase 1 & 2 tasks
- **Technical Details**:
  - Create/update README.md with:
    - Project description
    - Quick start guide
    - Feature overview
    - Technology stack
    - Directory structure explanation
  - Create CONTRIBUTING.md with:
    - How to add blog posts
    - How to report issues
    - Code style guidelines
    - Development setup instructions
  - Create DEPLOYMENT.md with:
    - How GitHub Actions workflow works
    - How to troubleshoot failed deployments
    - Secrets management
- **Success Criteria**:
  - Documentation is clear and comprehensive
  - New contributors can understand the project
  - Setup instructions work as written
  - All processes documented
- **Notes**: Good documentation scales the project

### Deployment & Monitoring

#### Task 3.7: Configure Custom Domain & SSL
- **Description**: Ensure bexleymesh.org is properly configured for production
- **Effort**: Small
- **Dependencies**: None
- **Technical Details**:
  - Verify DNS is pointing to GitHub Pages
  - Configure GitHub Pages settings:
    - Set custom domain to bexleymesh.org
    - Enable HTTPS/SSL enforcement
    - Verify CNAME file exists
  - Test domain accessibility
  - Verify SSL certificate is valid
- **Success Criteria**:
  - bexleymesh.org loads correctly
  - HTTPS works without warnings
  - www redirect works (if configured)
  - Certificate is valid and not expired
- **Notes**: Already mentioned as "already configured" in plan

#### Task 3.8: Set Up Monitoring & Alerting
- **Description**: Implement monitoring for site health and GitHub Actions
- **Effort**: Medium
- **Dependencies**: Task 3.7, Task 1.9
- **Technical Details**:
  - Set up monitoring for:
    - Website uptime (using service like Uptime Robot)
    - GitHub Actions workflow success/failure
    - Data freshness (repeater status updates)
  - Configure alerts for:
    - Failed deployments
    - Stale data (if data > 30 min old)
    - Site downtime
  - Create status dashboard (optional)
  - Implement email/Slack notifications (if available)
- **Success Criteria**:
  - Monitoring system operational
  - Alerts are received for failures
  - Can quickly identify issues
  - Historical data available
- **Notes**: Early warning system prevents issues reaching users

#### Task 3.9: Final Testing & Pre-Launch Checklist
- **Description**: Complete final verification before production launch
- **Effort**: Medium
- **Dependencies**: All Phase 3 tasks
- **Technical Details**:
  - Create comprehensive checklist:
    - [ ] All pages load without errors
    - [ ] All links work internally and externally
    - [ ] Blog posts display correctly
    - [ ] Repeater status updates every 5 min
    - [ ] Mobile responsive on all sizes
    - [ ] Accessibility audit passed
    - [ ] Performance targets met
    - [ ] SEO implementation complete
    - [ ] Custom domain configured
    - [ ] HTTPS enforced
    - [ ] GitHub Actions working
    - [ ] Monitoring in place
  - Run full regression test
  - User acceptance testing (with project stakeholders if possible)
  - Get sign-off from project lead
- **Success Criteria**:
  - All checklist items completed
  - Zero critical issues
  - Project lead approval obtained
  - Ready for public launch
- **Notes**: Don't skip this step - it catches last-minute issues

#### Task 3.10: Deploy to Production & Announce Launch
- **Description**: Push to production and notify the community
- **Effort**: Small
- **Dependencies**: Task 3.9
- **Technical Details**:
  - Ensure all code is committed and pushed to main
  - Verify GitHub Pages deployment is active
  - Test live domain one final time
  - Create launch announcement:
    - Post to Discord
    - Create social media announcement (if applicable)
    - Email community members (if list exists)
  - Monitor for issues post-launch
- **Success Criteria**:
  - Site is live at bexleymesh.org
  - Community is notified
  - No critical issues in first 24 hours
- **Notes**: Have a rollback plan ready just in case

---

## Phase 4: Future Enhancements (Out of Scope for Phase 1-3)

### Advanced Features
- Historical data tracking and trending for repeaters
- Analytics dashboard with uptime charts
- Community contribution portal
- Advanced search functionality
- Comments/discussion on blog posts
- Mobile app companion
- Automated newsletter for new posts
- Integration with GitHub issues for community ideas

---

## Task Dependencies Overview

```
Phase 1 Foundation:
  - Task 1.1 (Repo Structure) → All other tasks depend on this
  - Task 1.2 (Tailwind/FA) → 1.3, 1.8
  - Task 1.3 (Base Template) → 1.4, 1.5, 1.6, 1.8, 2.4
  - Task 1.4 (Markdown Parser) → 1.5, 1.6
  - Task 1.5 (Blog Listing) → 1.7
  - Task 1.6 (Blog Post Template) → 1.7
  - Task 1.7 (Blog Content) → 1.8, 2.3
  - Task 1.8 (Homepage) → 2.2, 2.3
  - Task 1.9 (GH Actions Config) → 1.10
  - Task 1.10 (Repeater Script) → (Phase 2)

Phase 2 Dynamic:
  - Task 2.1 (Data Schema) → 2.2
  - Task 2.2 (Status Dashboard) → 2.3
  - Task 2.3 (Stats on Homepage) → Phase 3 testing
  - Task 2.4 (Coverage Map) → Phase 3 testing

Phase 3 Polish:
  - Phase 1 & 2 complete → 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
  - All Phase 3 except 3.10 → 3.9
  - Task 3.9 → 3.10
```

## Suggested Execution Order

1. **Phase 1 Foundation** (Week 1-2):
   - Tasks 1.1-1.3: Setup (1-2 days)
   - Tasks 1.4-1.7: Blog infrastructure (3-5 days)
   - Task 1.8: Homepage (2-3 days)
   - Tasks 1.9-1.10: GitHub Actions (2-3 days)

2. **Phase 2 Dynamic** (Week 3):
   - Tasks 2.1-2.3: Repeater status (2-3 days)
   - Task 2.4: Coverage map (1 day)

3. **Phase 3 Polish** (Week 4):
   - Tasks 3.1-3.6: Testing, optimization, content (3-4 days)
   - Tasks 3.7-3.10: Deployment & launch (1-2 days)

**Total Estimated Timeline**: 3-4 weeks for complete project

---

**Document Version**: 1.0  
**Created**: February 27, 2026  
**Status**: Ready for Phase 1 Development
