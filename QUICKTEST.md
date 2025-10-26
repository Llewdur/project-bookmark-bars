# Quick 5-Minute Smoke Test

Follow these steps to verify basic functionality:

## 1. Create Bars (30 seconds)

- [ ] Click **"+ New Bar"**
- [ ] Type: `Work`
- [ ] Click **Save**
- [ ] Repeat for: `Personal`, `Research`

**Expected:** 3 bars appear in sidebar

---

## 2. Add Bookmarks (1 minute)

Click on "Work" bar, then:
- [ ] Click **"+ Add Bookmark"**
- [ ] Title: `GitHub`, URL: `https://github.com`
- [ ] Save
- [ ] Add: `Gmail` → `https://gmail.com`
- [ ] Add: `Stack Overflow` → `https://stackoverflow.com`

**Expected:** 3 bookmarks with favicons appear

---

## 3. Test Add Current Tab (30 seconds)

- [ ] Open a new tab and go to any website (e.g., `https://reddit.com`)
- [ ] Open the sidebar (`Alt+Shift+B` or View → Sidebar → Project Bookmarks)
- [ ] Make sure "Work" bar is active
- [ ] Click **"⭐ Add Current Tab"** button
- [ ] Button shows "✓ Added!" briefly
- [ ] Check "Work" bar - the current page appears as a bookmark

**Expected:** Current tab is instantly bookmarked, visual feedback appears

---

## 4. Test Drag & Drop (30 seconds)

If you have Firefox's bookmark bar visible:
- [ ] Drag a bookmark from Firefox's native bookmark bar
- [ ] Drag it over the "Personal" bar (must be expanded)
- [ ] You'll see a blue dashed outline appear
- [ ] Drop the bookmark
- [ ] The bookmark appears in "Personal" bar

**Expected:** Drag-and-drop works, visual feedback during drag

---

## 5. Test Folder Import (30 seconds)

If you have a bookmark folder in Firefox:
- [ ] Drag an entire folder from Firefox's bookmark bar
- [ ] Drop it onto the "Research" bar
- [ ] All bookmarks from the folder are imported

**Expected:** Multiple bookmarks added at once from folder

---

## 6. Test Reordering (30 seconds)

- [ ] Drag a bookmark in "Work" bar
- [ ] Drag it to a different position (up or down)
- [ ] Drop it between other bookmarks
- [ ] Bookmark moves to new position

**Expected:** Bookmark reorders within the same bar

---

## 7. Test Collapse (10 seconds)

- [ ] Click the ▶ icon next to "Work"
- [ ] Bar collapses (bookmarks hidden)
- [ ] Click again - bar expands

**Expected:** Smooth collapse/expand animation

---

## 8. Test Switching (30 seconds)

- [ ] Add 1 bookmark to "Personal" bar
- [ ] Click "Work" bar name - becomes active (blue highlight)
- [ ] Press `Alt+.` - switches to "Personal"
- [ ] Press `Alt+.` - switches to "Research"
- [ ] Press `Alt+,` - goes back to "Personal"

**Expected:** Active bar indicator moves, keyboard shortcuts work

---

## 9. Test Open All (30 seconds)

- [ ] Make "Work" bar active (should have 4+ bookmarks now)
- [ ] Click the **⇪** button (open all)
- [ ] All bookmarks open in background tabs

**Expected:** All bookmarks open in background tabs

---

## 10. Test Edit/Delete (1 minute)

- [ ] Hover over a bookmark
- [ ] Click **✎** (edit) button
- [ ] Change the title
- [ ] Save

**Expected:** Bookmark title updates

- [ ] Hover over another bookmark
- [ ] Click **✕** (delete)
- [ ] Confirm deletion

**Expected:** Bookmark disappears

---

## 11. Test Export (30 seconds)

- [ ] Scroll to bottom of sidebar
- [ ] Click **"Export"**
- [ ] JSON file downloads

**Expected:** File named `bookmark-bars-backup-[timestamp].json` in Downloads

---

## 12. Test Import (30 seconds)

- [ ] Delete "Work" bar entirely
- [ ] Click **"Import"**
- [ ] Select the JSON file you just exported
- [ ] Confirm replacement

**Expected:** "Work" bar restored with all bookmarks

---

## 13. Test Persistence (1 minute)

- [ ] Note current state (which bars exist, active bar)
- [ ] Close Firefox completely
- [ ] Reopen Firefox
- [ ] Open sidebar (`Alt+Shift+B`)

**Expected:** All data persists, active bar is still active

---

## 14. Check Console (30 seconds)

- [ ] Press `Ctrl+Shift+J` (Browser Console)
- [ ] Look for any errors (red text)

**Expected:** No errors, maybe some info logs

---

## ✅ Success Criteria

All 14 steps completed without errors → **Ready for use!**

If any step fails → **Report the issue and we'll fix it**

---

## 🐛 If Something Breaks

1. **Screenshot the error** (if visible)
2. **Check Browser Console** (`Ctrl+Shift+J`)
3. **Note the exact step** where it failed
4. **Share the error message**

Example bug report:
```
Step 5 failed - clicking ⇪ button does nothing
Console shows: "TypeError: bar.bookmarks is undefined"
```
