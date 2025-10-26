# Project Bookmark Bars

A Firefox extension for managing multiple bookmark bars organised by project. Perfect for developers, researchers, and anyone who juggles multiple contexts.

## Features

✅ **Multiple Bookmark Bars** - Create unlimited bookmark bars, one for each project or context
✅ **Collapse/Expand** - Keep your sidebar clean by collapsing bars you're not using
✅ **Quick Switching** - Keyboard shortcuts to switch between bars instantly
✅ **Open All** - Open all bookmarks in a bar with one click
✅ **Drag & Drop** - Drag bookmarks, move between bars, reorder within bars, and import entire folders
✅ **Quick Add** - One-click button to add the current tab to your active bar
✅ **Persistent Sidebar** - Always visible, doesn't interfere with your browsing
✅ **Safe Storage** - Stores data in extension storage (no risk of corrupting native bookmarks)
✅ **Export/Import** - Back up your bookmark bars to JSON files
✅ **Dark Mode** - Automatically adapts to your system theme

## Installation

### Development Installation (Temporary)

1. Clone or download this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" in the left sidebar
4. Click "Load Temporary Add-on"
5. Navigate to the extension directory and select the `manifest.json` file
6. The extension will appear in your sidebar menu

### Permanent Installation

For permanent installation, you'll need to:

1. Create a Firefox account
2. Package the extension as a `.zip` file
3. Submit it to [addons.mozilla.org](https://addons.mozilla.org)
4. Wait for review (or sign it for self-distribution)

**Quick packaging:**
```bash
cd project-bookmark-bars
zip -r ../project-bookmark-bars.xpi * -x "*.git*"
```

## Usage

### Opening the Sidebar

1. Press **`Alt+Shift+B`** to toggle the sidebar open/closed
2. Or click the sidebar icon in Firefox toolbar
3. Or press `Ctrl+B` (default Firefox sidebar shortcut) and select "Project Bookmarks"

### Creating Your First Bar

1. Click **"+ New Bar"** in the sidebar header
2. Enter a name (e.g., "Work", "Research", "Personal")
3. Click **Save**

### Adding Bookmarks

There are three ways to add bookmarks:

**Method 1: Add Current Tab (Quick)**
1. Navigate to the page you want to bookmark
2. Click **"⭐ Add Current Tab"** at the top of the sidebar
3. The page is instantly added to your active bar

**Method 2: Drag and Drop (Easy)**
1. Drag a bookmark from Firefox's bookmark bar or toolbar
2. Drop it onto any bookmark bar in the sidebar (expanded or collapsed)
3. You'll see a blue dashed outline when hovering over a valid drop zone
4. You can also drag bookmarks **between your own bookmark bars** to move them (works on collapsed bars too!)
5. **Drag entire folders** from Firefox's bookmark bar to import all bookmarks at once
6. **Reorder bookmarks** by dragging them up/down within the same bar

**Method 3: Manual Entry (Traditional)**
1. Expand a bar by clicking its name
2. Click **"+ Add Bookmark"** at the bottom of the bar
3. Enter a title and URL
4. Click **Save**

### Managing Bars

- **Switch bars**: Click on any bar name to make it active
- **Collapse/Expand**: Click the ▶ icon or the bar name
- **Open all bookmarks**: Click the ⇪ button in the bar header
- **Rename**: Click the ✎ (pencil) icon
- **Delete**: Click the ✕ icon (will ask for confirmation)

### Managing Bookmarks

- **Open**: Click on any bookmark to open it in a new tab
- **Reorder**: Drag a bookmark up/down within the same bar to change its position
- **Move**: Drag a bookmark and drop it onto a different bookmark bar
- **Edit**: Hover over a bookmark and click the ✎ icon
- **Delete**: Hover over a bookmark and click the ✕ icon

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Alt+Shift+B` | Toggle sidebar open/closed |
| `Alt+.` | Switch to next bar |
| `Alt+,` | Switch to previous bar |
| `Alt+1` | Switch to bar 1 |
| `Alt+2` | Switch to bar 2 |
| `Alt+3` | Switch to bar 3 |

**Customise shortcuts:**
1. Navigate to `about:addons`
2. Click the gear icon
3. Select "Manage Extension Shortcuts"
4. Find "Project Bookmark Bars" and customise

### Backup & Restore

**Export** (backup your data):
1. Click **Export** in the sidebar footer
2. A JSON file will download automatically

**Import** (restore from backup):
1. Click **Import** in the sidebar footer
2. Select your backup JSON file
3. Confirm the replacement (this will overwrite current data)

## Data Structure

All data is stored in `browser.storage.local` as JSON:

```json
{
  "bars": [
    {
      "id": "unique-id",
      "name": "Work",
      "collapsed": false,
      "bookmarks": [
        {
          "id": "unique-id",
          "title": "GitHub",
          "url": "https://github.com"
        }
      ]
    }
  ],
  "activeBarId": "unique-id"
}
```

## Development

### File Structure

```
project-bookmark-bars/
├── manifest.json          # Extension manifest
├── background.js          # Background script (keyboard commands, init)
├── sidebar/
│   ├── sidebar.html       # Sidebar UI structure
│   ├── sidebar.css        # Styling (with dark mode support)
│   └── sidebar.js         # UI logic and interactions
├── icons/
│   ├── icon-48.svg        # Extension icon (48x48)
│   └── icon-96.svg        # Extension icon (96x96)
└── README.md              # This file
```

### Technologies

- Vanilla JavaScript (no frameworks)
- WebExtensions API (Firefox standard)
- CSS Grid & Flexbox for layout
- Local storage for persistence

### Browser Compatibility

Currently Firefox-only (uses `sidebar_action` API).

To port to Chrome/Edge:
1. Change manifest to v3
2. Replace `browser.*` with `chrome.*`
3. Replace sidebar with popup or custom UI
4. Update storage calls for Chrome compatibility

## Troubleshooting

### Extension not loading

- Ensure you selected the `manifest.json` file, not the folder
- Check the browser console (`Ctrl+Shift+J`) for errors
- Verify Firefox version is 109.0 or higher

### Keyboard shortcuts not working

- Check for conflicts: `about:addons` → Manage Extension Shortcuts
- Some shortcuts may conflict with Firefox defaults
- Try customising to different key combinations

### Data not persisting

- Ensure the extension has storage permissions
- Check if Private Browsing mode is enabled (storage may not persist)
- Try exporting and re-importing your data

### Icons not showing

- Bookmark favicons are fetched from Google's favicon service
- If a site doesn't have a favicon, a generic bookmark emoji is shown
- No internet connection will show fallback icons

## Privacy

- **No tracking**: This extension doesn't collect or send any data
- **Local storage only**: All data stays on your device
- **No external requests**: Except for fetching bookmark favicons (from Google)
- **Open source**: Inspect the code yourself

## Licence

MIT Licence - Feel free to modify and distribute.

## Contributing

Found a bug? Have a feature request?

1. Check the issue tracker (if published)
2. Submit detailed bug reports with:
   - Firefox version
   - Steps to reproduce
   - Expected vs actual behaviour
3. Pull requests welcome!

## Roadmap

Potential future features:

- [ ] Drag-and-drop reordering for bars and bookmarks
- [ ] Search/filter bookmarks across all bars
- [ ] Tags and categories for bookmarks
- [ ] Chrome/Edge support
- [ ] Sync between devices (Firefox Sync integration)
- [ ] Import from native bookmarks
- [ ] Keyboard shortcut to add current page
- [ ] Bookmark folders/subgroups within bars
- [ ] Custom themes and colours
