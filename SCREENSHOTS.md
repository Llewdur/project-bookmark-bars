# Screenshot Guide for Firefox Add-ons Listing

Creating high-quality screenshots is crucial for attracting users. Follow this guide to create professional screenshots for your listing.

---

## Requirements

**Mozilla's Requirements:**
- Format: PNG or JPEG
- Maximum file size: 5 MB per image
- Recommended dimensions: 1280×800 or 1920×1080
- Minimum: 640×480
- You can upload 3-10 screenshots

---

## Screenshot Ideas

### Screenshot 1: Main Interface (Hero Shot)

**Purpose:** Show the core functionality at a glance

**Setup:**
1. Create 4 bookmark bars:
   - "Work Projects" (expanded, with ~5 bookmarks)
   - "Personal" (expanded, with ~3 bookmarks)
   - "Research" (collapsed)
   - "Learning" (collapsed)
2. Make "Work Projects" active (blue highlight)
3. Use light theme for better visibility
4. Make sure favicons are visible

**What to capture:**
- Full sidebar from top to bottom
- Show the "⭐ Add Current Tab" button
- Show both expanded and collapsed bars
- Show the Export/Import buttons at bottom

**Tip:** Use a clean, professional-looking set of bookmarks (GitHub, Stack Overflow, MDN, etc.)

---

### Screenshot 2: Drag-and-Drop in Action

**Purpose:** Demonstrate the drag-and-drop feature

**Setup:**
1. Create two expanded bars
2. Start dragging a bookmark from one bar
3. Hover over the destination bar to show the blue dashed outline
4. Take screenshot mid-drag

**What to capture:**
- Bookmark being dragged (semi-transparent)
- Destination bar with blue dashed outline
- Cursor positioned over drop zone

**How to capture:**
1. Reduce Firefox window size for better framing
2. Start dragging a bookmark
3. While holding drag, use a screenshot tool with a delay:
   - macOS: Cmd+Shift+5, set 5-second timer
   - Linux: Use `gnome-screenshot -d 5` or similar
   - Windows: Windows+Shift+S doesn't work while dragging, use external tool

---

### Screenshot 3: Quick Add Current Tab

**Purpose:** Show the one-click bookmark feature

**Setup:**
1. Open an attractive website (e.g., GitHub repo, design inspiration site)
2. Open sidebar
3. Take screenshot showing both the website and sidebar
4. Optionally: Add arrow or highlight pointing to "⭐ Add Current Tab" button

**What to capture:**
- Split view: main browser window + sidebar
- "⭐ Add Current Tab" button visible
- Current page is something recognisable

**Tip:** Use a screenshot annotation tool to add an arrow or circle highlighting the button

---

### Screenshot 4: Collapsed Bars & Quick Switching

**Purpose:** Show the space-saving collapsed view

**Setup:**
1. Create 5-6 bookmark bars
2. Collapse most of them (keep 1-2 expanded)
3. Show many bars fitting in the sidebar

**What to capture:**
- Multiple collapsed bars (clean, compact UI)
- Maybe 1-2 expanded bars for contrast
- Shows you can manage many projects without clutter

---

### Screenshot 5: Dark Mode

**Purpose:** Demonstrate dark theme support

**Setup:**
1. Switch your system to dark mode (Firefox will follow)
2. Open the extension sidebar
3. Show 2-3 expanded bars with bookmarks

**What to capture:**
- Full sidebar in dark theme
- Show it looks polished and readable
- Bookmarks with favicons visible

---

## Step-by-Step: Creating Screenshots

### Method 1: Firefox Built-in Screenshot Tool

1. Open Firefox and load the extension
2. Press `Ctrl+Shift+S` (or `Cmd+Shift+S` on Mac)
3. Click "Save visible" or drag to select area
4. Screenshot saves to Downloads

### Method 2: System Screenshot Tools

**Linux:**
```bash
# Whole screen
gnome-screenshot

# With 5-second delay (for capturing drag-and-drop)
gnome-screenshot -d 5

# Select area
gnome-screenshot -a
```

**macOS:**
- `Cmd+Shift+3` - Full screen
- `Cmd+Shift+4` - Select area
- `Cmd+Shift+5` - Screenshot tool with timer

**Windows:**
- `Windows+Shift+S` - Snipping tool
- Use Snipping Tool app for delays

---

## Editing Screenshots

### Recommended Tools

**Free & Open Source:**
- **GIMP** (Linux/Mac/Windows) - Full-featured
- **Pinta** (Linux) - Simple paint-style editor
- **Krita** (Linux/Mac/Windows) - Digital painting tool
- **Flameshot** (Linux) - Screenshot + annotation

**Online:**
- **Photopea** (photopea.com) - Free Photoshop alternative
- **Canva** - Easy annotations and text

### What to Edit

1. **Crop** - Remove unnecessary browser chrome (tabs, address bar)
2. **Resize** - Aim for 1280×800 or 1920×1080
3. **Annotate** (optional):
   - Add arrows pointing to key features
   - Add text labels ("Drag here", "One-click add", etc.)
   - Use high-contrast colours (red, yellow)
4. **Compress** - Keep under 5 MB

### Quick Crop Commands

```bash
# Crop to 1280x800 using ImageMagick
convert input.png -resize 1280x800^ -gravity center -extent 1280x800 output.png

# Optimise PNG
optipng output.png

# Or use pngcrush
pngcrush -brute input.png output.png
```

---

## Pro Tips

### Do:
- ✅ Use realistic, professional bookmark names
- ✅ Show bookmarks with favicons (they look better)
- ✅ Keep UI clean (close unnecessary bars/tabs)
- ✅ Use good contrast (light theme usually works best)
- ✅ Show 3-5 bookmarks per expanded bar
- ✅ Capture at high resolution (you can always downscale)

### Don't:
- ❌ Show personal bookmarks (private info)
- ❌ Show browser tabs with sensitive info
- ❌ Use offensive or controversial bookmark names
- ❌ Include copyrighted content in background
- ❌ Make screenshots too small (blurry when viewed)
- ❌ Over-annotate (keep it clean)

---

## Example Screenshot Layout

Here's a suggested order for your 5 screenshots:

1. **Hero shot** - Main interface showing multiple bars
2. **Drag-and-drop** - Mid-drag with blue outline
3. **Quick add** - Website + sidebar showing add button
4. **Dark mode** - Full sidebar in dark theme
5. **Compact view** - Many collapsed bars fitting cleanly

---

## Checklist Before Upload

- [ ] All screenshots are PNG or JPEG
- [ ] Each file is under 5 MB
- [ ] Dimensions are at least 640×480 (preferably 1280×800)
- [ ] No personal/sensitive information visible
- [ ] Screenshots show real functionality (not mockups)
- [ ] Images are clear and readable
- [ ] Favicon images loaded properly
- [ ] UI looks polished (no visual bugs)
- [ ] Filenames are descriptive (e.g., `01-main-interface.png`)

---

## Where to Upload

When submitting to addons.mozilla.org:

1. Go to your extension's edit page
2. Click "Edit Product Page"
3. Scroll to "Screenshots"
4. Click "Add Screenshot"
5. Upload each image
6. Add captions (optional but recommended):
   - "Organise bookmarks into multiple project-based bars"
   - "Drag-and-drop bookmarks between bars"
   - "Quick-add current tab with one click"
   - "Dark mode support"
   - "Collapsed bars keep your sidebar clean"

---

## Need Help?

If you're not comfortable creating screenshots, consider:
- Asking a designer friend
- Hiring on Fiverr (~$10-30 for simple screenshot editing)
- Using online screenshot mockup tools
- Posting on Reddit (/r/firefox, /r/design) for feedback

Good screenshots can **double or triple** your install rate—it's worth the effort!
