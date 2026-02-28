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
  - Keep existing Google Analytcs tag script
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

### MQTT Data Pipeline (Prerequisites for all Phase 2 tasks)

#### Task 2.0: Create GitHub Actions Workflow for API Data Fetch
- **Status**: 🚀 READY TO START
- **Description**: Build a GitHub Actions workflow that queries the letsmesh.net API and generates repeater status JSON file via automated script
- **Effort**: Large
- **Dependencies**: Task 1.9 (GitHub Actions infrastructure), Task 2.1 (Data schema)
- **Technical Details**:
  - Create `.github/workflows/update-repeater-status.yml` workflow file
  - Configure workflow to:
    - Trigger on schedule (every 15 minutes using cron: `*/5 * * * *`)
    - Allow manual trigger via GitHub UI (workflow_dispatch)
    - Set up Python environment (version 3.13+)
    - Install dependencies (requests library via uv pip)
    - Run new script `/scripts/fetch-repeater-data.py`
    - Commit and push updated `/data/repeater-status.json` to repository
  - Create `/scripts/fetch-repeater-data.py` Python script that:
    - Queries the letsmesh.net API endpoint: `https://api.letsmesh.net/api/packets/filtered`
    - Required API parameters:
      - `observer` - Your observer node public key (from GitHub secret `OBSERVER_PUBLIC_KEY`)
      - `region` - Geographic region (from GitHub secret `MESH_REGION`)
      - `limit` - Maximum packets to retrieve (set to 500)
    - Parses JSON response containing packet/advertisement objects
    - Extracts repeater information from decoded_payload (Advert type packets):
      - `node_name` - Repeater name
      - `lat`/`lon` - Coordinates from decoded_payload
      - `heard_at` - Most recent packet timestamp
      - `public_key` - Node identifier
      - `rssi` - Signal strength
    - Transforms API data into repeater-status.json format:
      - Aggregates multiple packets per repeater (using public_key as unique ID)
      - Determines online status: if heard_at is recent (< 1 hour) = online, else offline
      - Calculates last_seen from most recent packet timestamp
      - Matches against known repeater metadata (if available)
      - Formats timestamps in local timezone
    - Implements error handling for:
      - API connection failures (timeout, 5xx errors)
      - Network timeouts (with retry logic)
      - Malformed JSON responses
      - Missing or incomplete data fields
    - Writes output to `/data/repeater-status.json` with proper formatting
    - Logs execution details to console for debugging
    - Calculates aggregate network statistics:
      - Total repeater count
      - Online repeater count
      - Average signal strength
      - Network health percentage
  - Configure GitHub secrets required:
    - `OBSERVER_PUBLIC_KEY` - Your mesh observer node public key
    - `MESH_REGION` - Geographic region (e.g., CMH for Columbus)
  - Add workflow error handling:
    - Graceful failure if API is unavailable
    - Preserve previous data if fetch fails
    - Log errors to console for troubleshooting
    - Optional: Send notifications on failure (if notification method available)
- **Success Criteria**:
  - Workflow file is syntactically correct and appears in Actions tab
  - Script runs successfully and generates valid JSON output
  - GitHub secrets configured for API parameters
  - Workflow can be manually triggered for testing
  - JSON file commits to repository with proper formatting
  - Runs automatically every 5 minutes without manual intervention
  - Handles API failures gracefully without breaking the site
  - Previous data is preserved if fetch fails
  - Console logs provide useful debugging information
- **Integration Points**:
  - Input: letsmesh.net API endpoint (no authentication required, CORS enabled)
  - Output: `/data/repeater-status.json` file committed to repo
  - Consumes: GitHub secrets (OBSERVER_PUBLIC_KEY, MESH_REGION)
  - Triggers: Dashboard (Task 2.2) loads this file
  - Triggers: Statistics (Task 2.3) calculates from this file
  - Triggers: Coverage map (Task 2.4) may use location data
- **Implementation Details**:
  - The API endpoint returns 500 most recent packets across all nodes in the region
  - Only "Advert" payload_type packets contain repeater advertisement data with location info
  - Filter for `payload_type == "Advert"` and `decoded_payload.mode == "Repeater"`
  - Use public_key to uniquely identify repeaters (stays constant across packets)
  - Extract location and name from decoded_payload in Advert packets
  - Group packets by repeater to get most recent heard_at time
  - Consider online if heard within last 60 minutes (configurable via constant)
  - Use ISO timestamp from API, convert to local timezone for display
  - Calculate RSSI signal strength as percentage: -120 dBm = 0%, 0 dBm = 100%
- **API Response Structure**:
  - Response is array of packet objects
  - Key fields for repeater detection:
    - `payload_type` - Filter for "Advert" packets
    - `decoded_payload.mode` - Filter for "Repeater" type nodes
    - `node_name` - Human-readable repeater name
    - `decoded_payload.lat`/`lon` - Geographic coordinates
    - `heard_at` - ISO timestamp (UTC) of packet reception
    - `public_key` - Unique node identifier (hex string)
    - `rssi` - Signal strength in dBm (-120 to 0)
- **Related Tasks**:
  - Depends on: Task 2.1 (Schema definition)
  - Enables: Task 2.2 (Dashboard - loads and displays this data)
  - Enables: Task 2.3 (Stats - calculates from this data)
  - Enables: Task 2.4 (Coverage Map - uses location data)

### Live Repeater Status Display

#### Task 2.1: Design Data Schema for Repeater Status JSON
- **Status**: ✅ COMPLETED (Phase 1)
- **Description**: Define the structure of the repeater status JSON file
- **Effort**: Small
- **Dependencies**: None
- **Technical Details**:
  - ✅ JSON schema defined and implemented including:
    - Repeater ID
    - Name/Location
    - Status (online/offline/unknown)
    - Last seen timestamp
    - Signal strength (if available)
    - Battery level (if solar-powered)
    - Location coordinates (GPS coordinates + address)
    - Hardware and firmware information
    - Uptime percentage
  - ✅ Sample JSON file created with realistic data (3 nodes)
  - ✅ Schema is extensible and well-documented
- **Files Completed**:
  - `data/repeater-status.json` - Contains full schema implementation
- **Success Criteria**:
  - ✅ Schema is clear and extensible
  - ✅ Example JSON is valid and realistic
  - ✅ All necessary fields included
  - ✅ Easy to parse and display
  - ✅ Includes hardware/firmware metadata for future filtering
- **Notes**: Schema is production-ready and accommodates future enhancements

#### Task 2.2: Create Repeater Status Dashboard/Widget
- **Status**: 🚀 READY TO START
- **Description**: Build frontend component to display live repeater status
- **Effort**: Large
- **Dependencies**: Task 2.1 (✅ Completed)
- **Technical Details**:
  - Fetch JSON from `/data/repeater-status.json`
  - Create visual display showing:
    - List or grid of repeaters with cards or table view
    - Status indicators (green/red/gray icons using Font Awesome)
    - Last seen timestamp with relative time formatting (e.g., "2 minutes ago")
    - Signal strength visualization (dBm values with conditional styling)
    - Battery level indicators (progress bars or icons for nodes that have it)
    - Hardware/firmware info (expandable details or tooltip)
  - Implement auto-refresh (every 30-60 seconds)
  - Add loading states and skeleton loaders
  - Add error messages and fallback content
  - Make fully responsive for mobile viewing
  - Consider integrating with existing app.js utilities for consistency
  - May include sort/filter options (by status, hardware type, or location)
- **Success Criteria**:
  - Status updates automatically without requiring page refresh
  - Visual indicators are clear and intuitive (status colors, icons)
  - Mobile-responsive display (works on all device sizes)
  - Handles missing/null data gracefully
  - Updates reflect data changes within 5 minutes of fetch
  - Performance optimized with client-side caching
  - Accessibility: proper ARIA labels and semantic HTML
- **Implementation Notes**:
  - Can integrate into homepage hero section or create dedicated dashboard page
  - Reuse app.js utility functions for date formatting and data retrieval
  - Consider adding tooltips for signal strength and battery metrics
  - May want sort options for different use cases (uptime ranking, signal strength, etc.)

#### Task 2.3: Add Live Network Statistics to Homepage
- **Status**: 🚀 READY TO START (Placeholder exists, needs implementation)
- **Description**: Calculate and display aggregate network statistics
- **Effort**: Medium
- **Dependencies**: Task 2.2 (Must complete dashboard first for data integration)
- **Technical Details**:
  - Calculate from repeater-status.json:
    - Total repeaters in network
    - Online repeaters count
    - Network uptime percentage (average of all nodes)
    - Last data update timestamp
  - Display prominently on homepage hero section (currently has placeholder)
  - Update dynamically when data refreshes (via auto-refresh event)
  - Add visual elements:
    - Icon indicators for each stat
    - Color coding (green for healthy, yellow for warning, red for issues)
    - Last updated badge
- **Success Criteria**:
  - Statistics calculate correctly from repeater data
  - Display is visually prominent and professional
  - Numbers update when JSON is refreshed (every 5 minutes)
  - Handles edge cases (no data available, all offline, single node)
  - Mobile responsive
  - Accessibility compliant
- **Implementation Notes**:
  - Statistics should be dynamically calculated from data, not hardcoded
  - Use app.js utility functions to fetch and parse repeater status
  - Consider adding a "last updated" indicator
  - May want to add trend indicators (improving/degrading) for future enhancement

### Coverage Map Integration

#### Task 2.4: Embed Coverage Map Widget
- **Status**: 🚀 READY TO START
- **Description**: Integrate the cmh.meshmapper.net coverage map into the site
- **Effort**: Small
- **Dependencies**: Task 1.3 (✅ Completed - base template exists)
- **Technical Details**:
  - Research embedding options for cmh.meshmapper.net (check for iframes, API, or embed codes)
  - Create dedicated coverage map page (new file: `map.html` or as a section on homepage)
  - Implement responsive iframe or embed code with proper sizing
  - Add description and explanation of the map
  - Add link to full map with target="_blank" for external navigation
  - Ensure map is mobile-friendly (responsive container)
  - Add fallback for when embedded map unavailable
- **Success Criteria**:
  - Map displays correctly and is interactive
  - Mobile responsive (adapts to screen size)
  - Link to full map functional and opens in new window
  - Page loads without console errors
  - Proper styling/branding consistency with site design
  - Fallback content if map embedding unavailable
- **Implementation Notes**:
  - May need to contact cmh.meshmapper.net team if custom embed code is needed
  - Consider adding a brief explanation of what the map shows
  - Could add this to homepage as an additional section or create separate map page
  - Ensure CORS headers allow embedding if using iframe

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
  - Task 1.9 (GH Actions Config) → 1.10, 2.0
  - Task 1.10 (Repeater Script) → (Phase 2)

Phase 2 Dynamic:
  - Task 2.0 (MQTT Bridge) → 2.1, 2.2, 2.3, 2.4 ⭐ START HERE
  - Task 2.1 (Data Schema) → 2.2, 2.3
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
   - Task 2.0: MQTT Bridge (2-3 days) ⭐ **START HERE - Critical Data Pipeline**
   - Tasks 2.1-2.3: Repeater status frontend (2-3 days)
   - Task 2.4: Coverage map (1 day)

3. **Phase 3 Polish** (Week 4):
   - Tasks 3.1-3.6: Testing, optimization, content (3-4 days)
   - Tasks 3.7-3.10: Deployment & launch (1-2 days)

**Total Estimated Timeline**: 3-4 weeks for complete project

---

**Document Version**: 1.0  
**Created**: February 27, 2026  
**Status**: Ready for Phase 1 Development
