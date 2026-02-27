# Phase 1 Testing Guide

This guide helps you test all the Phase 1 features to ensure everything works correctly.

## Quick Start Testing

### 1. Start a Local Web Server

**Option A: Python 3**
```bash
cd c:\Users\david\Documents\projects\bexleymesh
python -m http.server 8000
```

**Option B: Node.js (if installed)**
```bash
npx http-server
```

Then open your browser to: **http://localhost:8000**

## Test Checklist

### Homepage (index.html)

- [✅] Page loads without errors
- [✅] All navigation links are visible and styled correctly
- [✅] "Get Started" and "View Coverage" buttons are clickable
  - FIXED: Added enhanced hover/active styling with color change, scale animation, and shadow effects for clear visual feedback
- [✅] Network statistics section displays correctly
- [✅] Latest updates section shows 2 blog post cards
- [✅] Blog post cards have:
  - [✅] Correct date and metadata
  - [✅] Working "Read Update/Guide" links
  - [✅] Proper hover effects
- [✅] "View All Posts" button visible and clickable
- [✅] Resources sidebar displays correctly
- [✅] Network Status widget displays repeater information
  - FIXED: Replaced MQTT widget with dynamic Network Status display showing online/offline repeaters with live counts
- [✅] Footer displays with proper layout
- [✅] All external links open correctly (Discord, GitHub, MeshCore, etc.)
  - FIXED: All external links now open in new tabs with target="_blank" and rel="noopener noreferrer"
  - FIXED: Added external link icons (⬈) to all external links for clear visual indication

### Blog Listing Page (blog.html)

1. **Navigation to Blog**
   - [✅] Click "Project Updates" in navigation → loads blog.html
   - [✅] Page title updates to "Project Updates"

2. **Blog Posts Display**
   - [✅] All 3 sample posts appear in list
   - [✅] Posts sorted by date (newest first)
     - FIXED: Refactored metadata from YAML front-matter to posts-manifest.json with proper date format handling
     - FIXED: Updated formatDate() function to handle ISO 8601 dates with UTC offset
   - [✅] Each post shows: date, author, title, excerpt
     - FIXED: BlogPost constructor now accepts metadata objects from manifest
     - FIXED: Metadata is no longer embedded in markdown files (cleaned up)
   - [✅] Posts display in correct order:
     1. Feb 14 - Solar Repeater
     2. Feb 10 - Getting Started
     3. Feb 7 - Welcome

3. **Post Cards**
   - [✅] Cards have hover effects (border highlight)
   - [✅] "Read More" links work correctly
   - [✅] Links point to post.html with correct slug
     - FIXED: Changed URL parameter from "slug" to "post" for consistency
     - Links now use: post.html?post=${post.slug}

4. **Pagination**
   - [✅] Pagination controls hidden when ≤ 10 total posts
     - ENHANCED: Previous/Next buttons hidden with 3 sample posts
     - ENHANCED: Page info text hidden when not needed
     - ENHANCED: Set max articles per page to 10
   - [✅] Pagination reappears when total posts > 10
   - [✅] Pagination always hidden when filtering by tag

5. **Categories Sidebar**
   - [✅] Shows all unique tags from blog posts
     - FIXED: Tags are now loaded from posts-manifest.json metadata
   - [✅] Expected tags: Hardware, Announcements, Guides
   - [✅] Clicking tag filters posts correctly
   - [✅] Clear Filters button visible in Categories panel
     - ENHANCED: Added "Clear Filters" button alongside tag pills
     - ENHANCED: Button has distinctive styling (mesh-500 colors)
     - ENHANCED: Clicking clears filter and shows all posts
   - [✅] Can clear filter by clicking "Project Updates" in nav

6. **Search Widget**
   - [✅] Search input is visible (note: search is structure for Phase 2)

7. **Resources Section**
   - [✅] All resource links visible
   - [✅] External links work correctly
     - FIXED: Added target="_blank" and rel="noopener noreferrer" to all external resource links
     - FIXED: Added external link icons (⬈) to visually indicate opening in new tab

### Individual Post Pages (post.html)

1. **Post Loading**
   - [✅] Click first post card → loads post.html with solar-repeater slug
     - FIXED: Changed URL parameter from "slug" to "post" for consistency
   - [✅] Post title appears as page title
   - [✅] Correct post content displays

2. **Post Content (Solar Repeater Post)**
   - [✅] Header with title, date, author displays
   - [✅] Tags display as clickable elements
   - [✅] Markdown renders correctly:
     - [✅] Headings (h1, h2) styled properly
     - [✅] Bold text renders
     - [✅] Lists display with proper formatting
     - [✅] Line breaks preserved

3. **Post Navigation**
   - [✅] "Previous Post" link appears
   - [✅] "Next Post" link appears
     - FIXED: Updated navigation links to use "post" parameter instead of "slug"
   - [✅] Links navigate to correct posts
   - [✅] Navigation works correctly from different posts

4. **Other Posts**
   - [✅] Test "Getting Started" post:
     - [✅] Code formatting displays
     - [✅] Numbered lists work
     - [✅] Links in content work
   - [✅] Test "Welcome" post:
     - [✅] Multiple sections display
     - [✅] Emphasis and formatting work

5. **Tag Filtering**
   - [✅] Click tag in post → filters blog page correctly
   - [✅] Only posts with that tag display

### Responsive Design Testing

**Desktop (1200px+)**
- [✅] Two-column layout with sidebar
- [✅] Full "BexleyMesh Community Network" text visible
- [✅] All navigation items visible inline
- [✅] All content easily readable
- [✅] No horizontal scrolling

**Tablet (768px - 1200px)**
- [✅] Layout adapts appropriately
  - FIXED: "BexleyMesh Community Network" → "BexleyMesh" text on screens < 1200px
  - FIXED: Menu items hidden, hamburger menu visible
  - FIXED: Sidebar Search and Categories panels above blog posts (mobile-first)
  - FIXED: Clear Filters button full width on own line
- [✅] Content still readable
- [✅] Navigation responsive with hamburger menu
- [✅] Text sizes appropriate

**Mobile (< 768px)**
- [✅] Single column layout
- [✅] Sidebar (Search and Categories) above articles
  - FIXED: Moved sidebar above posts for better mobile UX
  - FIXED: Search widget displays first
  - FIXED: Categories widget displays second
  - FIXED: Articles display below with full width
- [✅] Navigation responsive with hamburger menu
  - FIXED: Added hamburger menu button on left side
  - FIXED: Menu items stack vertically when opened
  - FIXED: Menu auto-closes on link click
  - FIXED: "BexleyMesh" text centered, Discord button on right
- [✅] Text readable without zooming
- [✅] Touch targets appropriately sized
- [✅] No horizontal scrolling
- [✅] All pages (index.html, blog.html, post.html) responsive

### Browser Compatibility

Test in multiple browsers:

**Chrome/Chromium**
- [✅] Page loads
- [✅] No console errors
- [✅] All features work
- [✅] Layout correct

**Firefox**
- [ ] Page loads
- [ ] No console errors
- [ ] All features work
- [ ] Layout correct

**Safari** (if available)
- [ ] Page loads
- [ ] No console errors
- [ ] All features work
- [ ] Layout correct

**Edge**
- [✅] Page loads
- [✅] No console errors
- [✅] All features work
- [✅] Layout correct

### Performance Testing

1. **Load Times**
   - [✅] Homepage loads in < 3 seconds (realistic broadband)
   - [✅] Blog page loads in < 3 seconds
   - [✅] Post pages load in < 2 seconds

2. **JavaScript Console**
   - [✅] No errors in console (F12 → Console tab)
   - [✅] No warnings
   - [✅] All resources load successfully (Network tab)

3. **CSS & Styling**
   - [✅] Custom CSS loads correctly
   - [✅] Tailwind CSS classes work
   - [✅] Font Awesome icons display
   - [✅] Color theme consistent

### Accessibility Testing

1. **Keyboard Navigation**
   - [ ] Tab through navigation - items highlight
   - [ ] Links are keyboard accessible
   - [ ] Buttons are keyboard clickable (Enter key)
   - [ ] Focus indicators visible
   - [ ] No keyboard traps

2. **Color & Contrast**
   - [ ] Text readable against background
   - [ ] Links distinguishable from text
   - [ ] Color not only indicator of status

3. **Semantic HTML**
   - [ ] Headings use proper hierarchy (no skipped levels)
   - [ ] Lists use proper list elements
   - [ ] Navigation uses nav elements
   - [ ] Content uses appropriate semantic tags

### Content Verification

1. **Blog Posts**
   - [✅] All 3 posts load correctly
   - [✅] Metadata accurate (dates, authors, tags)
   - [✅] Excerpts match post content
   - [✅] Post content renders fully

2. **Documentation**
   - [ ] Getting started guide content is accurate
   - [ ] Hardware guide content is accurate
   - [ ] Links in docs work correctly

3. **External Links**
   - [ ] Discord link works
   - [ ] GitHub link works
   - [ ] MeshCore link works
   - [ ] Central Ohio Mesh link works
   - [ ] Links open in new tabs (where specified)

## Test Scenarios

### Scenario 1: New User Journey
1. User arrives at homepage (index.html)
2. Reads about project
3. Clicks "View All Posts" button
4. Browses blog posts
5. Clicks on first post
6. Reads full post content
7. Uses navigation to read next post
8. Clicks tag to filter posts
9. Returns to homepage via navigation

**Expected Result**: All transitions smooth, content loads correctly, no errors

### Scenario 2: Documentation Discovery
1. User needs getting started info
2. Finds links in resources section or blog
3. Accesses documentation pages
4. Follows step-by-step instructions
5. Finds all required information

**Expected Result**: Documentation is clear and complete

### Scenario 3: Mobile Experience
1. User accesses site on smartphone (< 640px)
2. Homepage displays correctly
3. Navigation is accessible
4. Can click blog posts
5. Can read post content
6. Can navigate between posts

**Expected Result**: Mobile layout works perfectly, no pinching/zooming needed

## Troubleshooting

### Common Issues

**Pages don't load**
- Check that server is running
- Check that you're accessing correct URL (localhost:8000)
- Check browser console for errors (F12)

**Markdown not rendering correctly**
- Check browser console for JavaScript errors
- Verify posts-manifest.json contains post filenames
- Check that post files exist in /posts/ directory

**Styling looks wrong**
- Verify CSS files are loading (check Network tab in F12)
- Check that Tailwind and Font Awesome CDNs are accessible
- Clear browser cache (Ctrl+Shift+Delete)

**Images/icons not showing**
- Check Font Awesome CDN is loading
- Verify internet connection for CDN resources
- Check browser console for CORS errors

**Links don't work**
- Verify slug in URL matches post filename
- Check that files exist in correct directories
- Clear browser cache

## Passing Criteria

Phase 1 is considered successful if:

✅ All navigation works correctly  
✅ All 3 blog posts load and display properly  
✅ Markdown rendering is correct  
✅ Responsive design works on all screen sizes  
✅ No console errors or warnings  
✅ External links function correctly  
✅ Page load times are acceptable (< 3 seconds)  
✅ Accessibility standards are met  

## Sign-Off

After completing all tests, document:

- Date tested: _______________
- Tester name: _______________
- Browser versions tested: _______________
- Issues found: _______________
- Overall status: ✅ PASS / ❌ FAIL

---

**Note**: This is Phase 1 testing. Phase 2 will add more complex features like live repeater status updates and MQTT integration.
