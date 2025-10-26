# Release Checklist - Project Bookmark Bars

Use this checklist before publishing your extension to Firefox Add-ons.

---

## Phase 1: Pre-Flight Testing ✈️

### Functionality Testing
- [ ] Load extension in Firefox (`about:debugging`)
- [ ] Create 3-4 bookmark bars with different names
- [ ] Add 5-10 bookmarks to each bar
- [ ] Test collapse/expand all bars
- [ ] Test drag-and-drop between expanded bars
- [ ] Test drag-and-drop to collapsed bar headers
- [ ] Test "Add Current Tab" button on various websites
- [ ] Test "Open All" with 3 bookmarks
- [ ] Test "Open All" with 15+ bookmarks (should prompt)
- [ ] Test keyboard shortcuts:
  - [ ] `Alt+Shift+B` - Toggle sidebar
  - [ ] `Alt+.` - Next bar
  - [ ] `Alt+,` - Previous bar
  - [ ] `Alt+1/2/3` - Jump to bars
- [ ] Test Edit bookmark (change title and URL)
- [ ] Test Delete bookmark
- [ ] Test Rename bar
- [ ] Test Delete bar
- [ ] Test Export (downloads JSON)
- [ ] Test Import (restores from JSON)
- [ ] Test in **Light Mode**
- [ ] Test in **Dark Mode**

### Browser Restart Test
- [ ] Close Firefox completely
- [ ] Reopen Firefox
- [ ] Open extension sidebar
- [ ] Verify all data persisted
- [ ] Verify active bar still active
- [ ] Verify collapsed state persisted

### Clean Install Test
- [ ] Create new Firefox profile: `firefox -ProfileManager`
- [ ] Load extension in clean profile
- [ ] Test basic functionality
- [ ] No errors in Browser Console (`Ctrl+Shift+J`)

### Edge Cases
- [ ] Create bar with very long name (50 chars)
- [ ] Add bookmark with very long title (100 chars)
- [ ] Add bookmark with very long URL
- [ ] Try to add bookmark without title (should error)
- [ ] Try to add bookmark without URL (should error)
- [ ] Try to add bookmark with invalid URL (should error)
- [ ] Delete last bar (should handle gracefully)
- [ ] Import invalid JSON (should show error)

---

## Phase 2: Documentation 📝

### Update Personal Information
- [ ] Open `manifest.json`
- [ ] Update `author` field (line 73) with your name/username
- [ ] Update `homepage_url` field (line 74) with your GitHub URL
- [ ] Consider updating `id` field (line 68) or remove it (see PUBLISHING.md)

### Update Contact Information
- [ ] Open `PRIVACY.md`
- [ ] Replace `your-email@example.com` with real email (lines 78, 119)
- [ ] Replace GitHub URL with real repo URL (lines 77, 118, 121)
- [ ] Update "Last Updated" date (line 3)

- [ ] Open `AMO_LISTING.md`
- [ ] Replace `your-email@example.com` with real email
- [ ] Replace GitHub URLs with real repo URLs

- [ ] Open `PUBLISHING.md`
- [ ] Replace `yourusername` in URLs with your actual username

### Review All Documentation
- [ ] Read through `README.md` - anything missing?
- [ ] Read through `PRIVACY.md` - accurate and complete?
- [ ] Read through `AMO_LISTING.md` - description compelling?

---

## Phase 3: Create Assets 📸

### Screenshots (See SCREENSHOTS.md)
- [ ] Screenshot 1: Main interface (multiple bars, some expanded/collapsed)
- [ ] Screenshot 2: Drag-and-drop in action (blue outline visible)
- [ ] Screenshot 3: Quick add current tab button
- [ ] Screenshot 4: Dark mode view
- [ ] Screenshot 5: Many collapsed bars (compact view)

### Screenshot Quality Check
- [ ] All screenshots are PNG or JPEG
- [ ] All screenshots are 1280×800 or 1920×1080
- [ ] All screenshots under 5 MB
- [ ] No personal/sensitive info visible
- [ ] Favicons loaded properly (not broken images)
- [ ] UI looks polished (no visual bugs)
- [ ] Filenames are descriptive (`01-main-interface.png`, etc.)

### Optional: Create Icon Variations
The extension uses SVG icons which work everywhere, but you can optionally create PNG versions:
- [ ] Convert `icons/icon-48.svg` to PNG (optional)
- [ ] Convert `icons/icon-96.svg` to PNG (optional)

---

## Phase 4: Package Extension 📦

### Create ZIP File
```bash
cd /home/llew/workspace/z/project-bookmark-bars

zip -r -FS ../project-bookmark-bars-v1.0.0.zip * \
  --exclude "*.git*" \
  --exclude "TESTING.md" \
  --exclude "QUICKTEST.md" \
  --exclude "SCREENSHOTS.md" \
  --exclude "AMO_LISTING.md" \
  --exclude "PUBLISHING.md" \
  --exclude "RELEASE_CHECKLIST.md"
```

### Verify Package
- [ ] Run: `unzip -l ../project-bookmark-bars-v1.0.0.zip`
- [ ] Verify includes:
  - [ ] manifest.json
  - [ ] background.js
  - [ ] sidebar/ directory
  - [ ] icons/ directory
  - [ ] README.md
  - [ ] PRIVACY.md
- [ ] Verify excludes:
  - [ ] No .git/ folder
  - [ ] No internal docs (TESTING.md, etc.)
  - [ ] No node_modules/

### Test Package
- [ ] Load the ZIP file in Firefox (`about:debugging` → Load Temporary Add-on)
- [ ] Quick smoke test (create bar, add bookmark, test drag-drop)
- [ ] No errors in console

---

## Phase 5: Mozilla Account Setup 🔐

- [ ] Go to https://addons.mozilla.org
- [ ] Create account or log in
  - [ ] Use GitHub login (recommended) OR
  - [ ] Use Firefox Account
- [ ] Verify email if required
- [ ] Navigate to https://addons.mozilla.org/developers/

---

## Phase 6: Submission 🚀

### Submit Extension
- [ ] Click "Submit a New Add-on"
- [ ] Accept Developer Agreement
- [ ] Upload ZIP file: `project-bookmark-bars-v1.0.0.zip`
- [ ] Wait for automatic validation (should pass)
- [ ] Click "Continue"

### Choose Distribution
- [ ] Select "On this site" (public listing)

### Fill In Details (Use AMO_LISTING.md)
- [ ] Name: `Project Bookmark Bars`
- [ ] Add-on URL: `project-bookmark-bars` (or auto-generated)
- [ ] Summary: Copy from AMO_LISTING.md (tagline)
- [ ] Description: Copy full description from AMO_LISTING.md
- [ ] Categories: Bookmarks & Tabs (primary), Productivity (secondary)
- [ ] Tags: `bookmarks, productivity, organization, tabs, projects`
- [ ] Support Email: Your email
- [ ] Support Website: Your GitHub repo URL
- [ ] Privacy Policy: Link to GitHub PRIVACY.md OR paste directly
- [ ] License: MIT License

### Upload Screenshots
- [ ] Upload screenshot 1
- [ ] Add caption: "Organise bookmarks into multiple project bars"
- [ ] Upload screenshot 2
- [ ] Add caption: "Drag-and-drop bookmarks between bars, even collapsed ones"
- [ ] Upload screenshot 3
- [ ] Add caption: "Quick-add your current tab with one click"
- [ ] Upload screenshot 4
- [ ] Add caption: "Beautiful dark mode support"
- [ ] Upload screenshot 5
- [ ] Add caption: "Collapsed bars keep your UI clean"

### Version Notes
- [ ] Copy version notes from AMO_LISTING.md

### Submit
- [ ] Review all information
- [ ] Click "Submit Version"
- [ ] Wait for confirmation email

---

## Phase 7: While Waiting for Review ⏳

Typical review time: 1-7 days

### Prepare Marketing Materials
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Write README with AMO install link
- [ ] Draft social media posts (see AMO_LISTING.md)
- [ ] Draft blog post / Dev.to article
- [ ] Prepare email to tech bloggers

### Monitor Email
- [ ] Check daily for reviewer questions
- [ ] Respond quickly to any questions
- [ ] Check spam folder

---

## Phase 8: After Approval ✅

### Celebrate!
- [ ] 🎉 Your extension is live!

### Update GitHub
- [ ] Add AMO badge to README:
  ```markdown
  [![Firefox Add-on](https://img.shields.io/amo/v/project-bookmark-bars)](https://addons.mozilla.org/firefox/addon/project-bookmark-bars/)
  ```
- [ ] Add installation instructions with AMO link
- [ ] Tag release: `git tag v1.0.0 && git push --tags`

### Promote
- [ ] Post on Reddit (/r/firefox, /r/productivity)
- [ ] Tweet about it
- [ ] Post on LinkedIn
- [ ] Submit to Product Hunt
- [ ] Post on Hacker News (Show HN)
- [ ] Email tech blogs/newsletters
- [ ] Write Dev.to article

### Monitor
- [ ] Check AMO statistics daily
- [ ] Respond to reviews
- [ ] Address bug reports
- [ ] Plan next version features

---

## Phase 9: If Rejected ⚠️

Don't panic! Most extensions get approved on second try.

### Common Rejection Reasons
- [ ] Missing privacy policy → Add PRIVACY.md link
- [ ] Unclear permissions → Explain in description
- [ ] Unclear description → Revise with more detail
- [ ] Icon issues → Check icon files included

### Resubmission
- [ ] Read rejection email carefully
- [ ] Fix the issues
- [ ] Increment version to 1.0.1 if code changes
- [ ] Repackage and resubmit
- [ ] Respond professionally to reviewer

---

## Common Issues & Solutions

### "Manifest validation failed"
- Check JSON syntax (no trailing commas)
- Use `web-ext lint` to find errors

### "Icons not loading"
- Make sure `icons/` folder in ZIP
- Check paths in manifest.json match

### "Permissions too broad"
- Explain why you need each permission in description
- We only use `storage` and `tabs` - both justified

### "Privacy policy required"
- Link to PRIVACY.md on GitHub
- Or paste PRIVACY.md content directly

---

## Final Check ✅

Before clicking "Submit":

- [ ] Tested extension thoroughly
- [ ] All documentation updated
- [ ] Screenshots created (3-5 images)
- [ ] ZIP file packaged correctly
- [ ] Personal info updated (author, email, URLs)
- [ ] Privacy policy available
- [ ] Listing description compelling

**Ready to publish?** Follow PUBLISHING.md step-by-step!

---

## Post-Release Maintenance

### Version Updates

When releasing v1.1.0 or v1.0.1:
- [ ] Update version in `manifest.json`
- [ ] Write clear version notes
- [ ] Package new ZIP
- [ ] Go to AMO → Your Extensions → Upload New Version
- [ ] Submit (faster review than initial: 1-3 days typically)

### Support

- [ ] Respond to user reviews
- [ ] Fix bugs quickly
- [ ] Consider user feature requests
- [ ] Keep documentation updated

---

**Good luck with your release!** 🚀

You've built something useful. Now share it with the world!
