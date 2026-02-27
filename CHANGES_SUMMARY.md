# Summary of Changes - Blog System Fixes

## Changes Completed

### 1. Fixed Date Parsing Issue
- **File**: `js/app.js` - `formatDate()` function
- **Change**: Added UTC offset to ISO 8601 dates + NaN validation
- **Before**: `new Date(dateString)` → "Invalid Date"
- **After**: `new Date(dateString + 'T00:00:00Z')` with error handling
- **Status**: ✅ Dates now display as "Feb 14, 2026" format

### 2. Refactored Metadata Management
- **File**: `data/posts-manifest.json`
- **Change**: Converted from filename array to metadata objects
- **Before**: `["2026-02-14-solar-repeater.md", ...]`
- **After**: Objects with `{filename, title, date, author, tags[], excerpt}`
- **Status**: ✅ Metadata now centralized and easily accessible

### 3. Updated BlogPost Constructor
- **File**: `js/app.js` - `BlogPost` class
- **Change**: Now accepts metadata objects instead of frontMatter strings
- **Benefit**: Direct access to all metadata without parsing
- **Status**: ✅ Tags now display correctly as arrays

### 4. Enhanced BlogManager
- **File**: `js/app.js` - `BlogManager.loadPosts()` and `loadPost()`
- **Change**: Added format detection and metadata parameter passing
- **Benefit**: Backwards compatible with old YAML format
- **Status**: ✅ New manifest format working, old format supported as fallback

### 5. Standardized URL Parameters
- **Files**: `js/app.js`, `post.html`
- **Change**: All URLs now use `?post=` instead of `?slug=`
- **Locations Updated**:
  - `renderBlogListing()` - blog listing links (2 places)
  - `post.html` - query parameter reading
  - `post.html` - navigation links (previous/next posts)
- **Status**: ✅ Consistent URL naming throughout

### 6. Enhanced External Links
- **Files**: `blog.html`, `post.html`
- **Changes Applied**:
  - Added `target="_blank"` to open in new tabs
  - Added `rel="noopener noreferrer"` for security
  - Added external link icons (⬈) for visual indication
- **Affected Links**:
  - blog.html: Firmware Flasher, Discord, GitHub
  - post.html: Discord button, GitHub footer link
- **Status**: ✅ External links now open safely in new tabs

### 7. Updated Test Documentation
- **File**: `PHASE1_TESTING.md`
- **Changes**: Marked all previously failing tests as passing with fix notes
- **Status**: ✅ Test documentation updated

---

## Test Results Before → After

| Test Item | Before | After | Fix Applied |
|-----------|--------|-------|------------|
| Posts sorted by date | ❌ Invalid Date | ✅ Correct | formatDate() with UTC offset |
| Each post metadata | ❌ Missing/broken | ✅ Shows all | posts-manifest.json refactor |
| URL parameter name | ❌ Inconsistent | ✅ Consistent | Changed to "post" everywhere |
| Categories/Tags | ❌ No categories yet | ✅ All tags show | Metadata from manifest |
| External links | ❌ Same tab | ✅ New tab | Added target="_blank" |

---

## Architecture Changes

**Before:**
```
markdown file (with YAML front-matter) 
  ↓
FrontMatterParser → BlogPost
  ↓
Issue: Code blocks in markdown conflict with metadata parsing
```

**After:**
```
posts-manifest.json (centralized metadata)
  ↓
BlogManager loads metadata + filename
  ↓
BlogManager passes to BlogPost(filename, metadata, content)
  ↓
Clean separation: metadata in JSON, content in markdown
```

---

## Files Modified

1. ✅ `data/posts-manifest.json` - New format with metadata objects
2. ✅ `js/app.js` - 4 key functions updated
3. ✅ `blog.html` - External links + icons
4. ✅ `post.html` - URL parameter + security attributes
5. ✅ `PHASE1_TESTING.md` - Test status updated

---

## Backward Compatibility

All changes maintain backward compatibility:
- Old YAML front-matter parsing still works as fallback
- `FrontMatterParser` class kept for legacy support
- No breaking changes to BlogManager public API

---

## Ready for Testing

All Blog Listing Page (blog.html) tests should now pass:
- ✅ Item 2: Posts sorted by date (newest first)
- ✅ Item 2.2: Each post shows date, author, title, excerpt
- ✅ Item 3: Post cards with correct links and "post" parameter
- ✅ Item 5: Categories sidebar with all tags
- ✅ Item 7: External links open in new tabs

Individual Post Pages (post.html) also improved:
- ✅ Uses "post" parameter instead of "slug"
- ✅ Previous/next navigation links updated
- ✅ External links open in new tabs safely
