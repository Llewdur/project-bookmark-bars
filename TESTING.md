# Testing Checklist

## Installation Test

- [ ] Load extension in Firefox (`about:debugging`)
- [ ] Extension appears in sidebar menu
- [ ] No console errors when opening sidebar

## Basic Functionality

### Bar Management
- [ ] Click "+ New Bar" - modal opens
- [ ] Create bar named "Test Work" - saves successfully
- [ ] Create bar named "Test Personal" - saves successfully
- [ ] Create bar named "Test Research" - saves successfully
- [ ] Click bar name - bar becomes active (highlighted)
- [ ] Click collapse icon - bar collapses
- [ ] Click again - bar expands
- [ ] Click edit (✎) - modal opens with current name
- [ ] Rename bar - saves successfully
- [ ] Click delete (✕) - confirmation appears
- [ ] Confirm delete - bar removed

### Bookmark Management
- [ ] Click "+ Add Bookmark" - modal opens
- [ ] Add bookmark with title and URL - saves successfully
- [ ] Bookmark appears with favicon
- [ ] Click bookmark - opens in new tab
- [ ] Add 5-10 more bookmarks to same bar
- [ ] Hover over bookmark - edit/delete buttons appear
- [ ] Click edit - modal opens with current data
- [ ] Edit bookmark - saves successfully
- [ ] Click delete - confirmation appears
- [ ] Confirm delete - bookmark removed

### Open All Functionality
- [ ] Create bar with 3 bookmarks
- [ ] Click ⇪ (open all) - all bookmarks open in tabs
- [ ] Create bar with 15 bookmarks
- [ ] Click ⇪ (open all) - confirmation dialog appears
- [ ] Confirm - all bookmarks open

### Keyboard Shortcuts
- [ ] Press `Alt+.` - switches to next bar
- [ ] Press `Alt+,` - switches to previous bar
- [ ] Press `Alt+1` - switches to first bar
- [ ] Press `Alt+2` - switches to second bar
- [ ] Press `Alt+3` - switches to third bar

### Export/Import
- [ ] Click "Export" - JSON file downloads
- [ ] Open JSON file - data structure looks correct
- [ ] Create new bar with bookmarks
- [ ] Click "Import" - file picker opens
- [ ] Select previous export - confirmation appears
- [ ] Confirm - data restored from backup

## UI/UX Testing

### Visual
- [ ] Light mode renders correctly
- [ ] Dark mode renders correctly (change system theme)
- [ ] No layout issues or overlapping elements
- [ ] Hover states work on all buttons
- [ ] Active bar is clearly highlighted
- [ ] Favicon fallback works (for invalid URLs)

### Interaction
- [ ] Modal closes on "Cancel" button
- [ ] Modal closes on `Escape` key
- [ ] Modal saves on "Save" button
- [ ] Modal saves on `Enter` key (in inputs)
- [ ] Scrolling works when many bars exist
- [ ] Scrolling works when many bookmarks exist

### Edge Cases
- [ ] Empty bar name - shows error
- [ ] Empty bookmark title - shows error
- [ ] Empty bookmark URL - shows error
- [ ] Invalid URL format - shows error
- [ ] Very long bar name (50+ chars) - truncates properly
- [ ] Very long bookmark title (100+ chars) - truncates properly
- [ ] Delete last bar - handles gracefully
- [ ] Import invalid JSON - shows error

## Browser Restart Test

- [ ] Close Firefox
- [ ] Reopen Firefox
- [ ] Open sidebar - all data persists
- [ ] Active bar is still active
- [ ] Collapsed state persists

## Performance Test

- [ ] Create 10 bars with 20 bookmarks each
- [ ] Switching between bars is fast (<100ms perceived)
- [ ] Opening sidebar is fast
- [ ] No lag when scrolling
- [ ] Export/import works with large dataset

## Known Issues

Document any bugs found:

1.
2.
3.

## Test Environment

- **Firefox Version**:
- **OS**: Linux 6.14.0-33-generic
- **Date Tested**:
- **Tester**:

---

## Quick Test Scenario

**5-Minute Smoke Test:**

1. Load extension
2. Create 3 bars: "Work", "Personal", "Research"
3. Add 3 bookmarks to "Work"
4. Add 2 bookmarks to "Personal"
5. Switch between bars using keyboard (`Alt+.`)
6. Open all bookmarks in "Work" (⇪ button)
7. Export data
8. Delete a bookmark
9. Import data (restore deleted bookmark)
10. Restart Firefox - verify persistence

If all 10 steps work → ready for wider testing
