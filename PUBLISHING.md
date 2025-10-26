# Publishing Guide: Firefox Add-ons

Complete step-by-step guide to publishing **Project Bookmark Bars** on addons.mozilla.org (AMO).

---

## Table of Contents

1. [Pre-Submission Checklist](#pre-submission-checklist)
2. [Update Extension Details](#update-extension-details)
3. [Package the Extension](#package-the-extension)
4. [Create Screenshots](#create-screenshots)
5. [Create Mozilla Account](#create-mozilla-account)
6. [Submit to AMO](#submit-to-amo)
7. [After Submission](#after-submission)
8. [Marketing & Promotion](#marketing--promotion)

---

## Pre-Submission Checklist

Before submitting, make sure:

- [ ] Extension works perfectly (no bugs)
- [ ] Tested on fresh Firefox profile
- [ ] Tested in both light and dark modes
- [ ] All features documented in README.md
- [ ] manifest.json has correct version number
- [ ] manifest.json has your author name
- [ ] manifest.json has correct homepage URL
- [ ] Privacy policy created (see PRIVACY.md)
- [ ] Screenshots ready (3-5 images)
- [ ] Listing content ready (see AMO_LISTING.md)

---

## Update Extension Details

### 1. Update manifest.json

Open `manifest.json` and update these fields:

```json
{
  "author": "Your Name or GitHub Username",
  "homepage_url": "https://github.com/yourusername/project-bookmark-bars"
}
```

**Extension ID:**
The current ID is `project-bookmark-bars@mozilla.org`. You can:
- **Keep it** - Works fine for most cases
- **Change it** - Use format: `your-extension@yourdomain.com`
- **Remove it** - Mozilla will auto-assign a UUID (recommended for first-time publishers)

To remove the ID (recommended):
```json
"browser_specific_settings": {
  "gecko": {
    "strict_min_version": "109.0"
  }
}
```

### 2. Set Version Number

Current version: `1.0.0`

For future updates, follow semantic versioning:
- **Major** (1.0.0 → 2.0.0) - Breaking changes
- **Minor** (1.0.0 → 1.1.0) - New features
- **Patch** (1.0.0 → 1.0.1) - Bug fixes

---

## Package the Extension

### Method 1: Command Line (Recommended)

```bash
cd /home/llew/workspace/z/project-bookmark-bars

# Create a zip file (Firefox accepts .zip as .xpi)
zip -r -FS ../project-bookmark-bars-v1.0.0.zip * \
  --exclude "*.git*" \
  --exclude "*.md" \
  --exclude "TESTING.md" \
  --exclude "QUICKTEST.md" \
  --exclude "SCREENSHOTS.md" \
  --exclude "AMO_LISTING.md" \
  --exclude "PUBLISHING.md" \
  --exclude "PRIVACY.md"
```

The package will be saved at: `/home/llew/workspace/z/project-bookmark-bars-v1.0.0.zip`

### Method 2: Using Firefox's web-ext Tool

Install web-ext:
```bash
npm install -g web-ext
```

Build and sign:
```bash
cd /home/llew/workspace/z/project-bookmark-bars

# Build (creates .zip in web-ext-artifacts/)
web-ext build

# Optional: Lint for errors
web-ext lint
```

### Verify the Package

```bash
# List contents
unzip -l project-bookmark-bars-v1.0.0.zip

# Should include:
# ✅ manifest.json
# ✅ background.js
# ✅ sidebar/sidebar.html
# ✅ sidebar/sidebar.css
# ✅ sidebar/sidebar.js
# ✅ icons/icon-48.svg
# ✅ icons/icon-96.svg
# ✅ README.md (optional but nice)

# Should NOT include:
# ❌ .git/
# ❌ PUBLISHING.md, TESTING.md (internal docs)
# ❌ node_modules/
```

---

## Create Screenshots

See **SCREENSHOTS.md** for detailed instructions.

Quick summary:
1. Create 3-5 screenshots showing key features
2. Dimensions: 1280×800 or 1920×1080
3. Format: PNG or JPEG, under 5 MB each
4. Save with descriptive names:
   - `01-main-interface.png`
   - `02-drag-and-drop.png`
   - `03-quick-add.png`
   - `04-dark-mode.png`
   - `05-collapsed-bars.png`

---

## Create Mozilla Account

1. Go to https://addons.mozilla.org
2. Click **"Log in"** (top right)
3. Choose:
   - **Firefox Account** (recommended)
   - **GitHub** (easier if you have a repo)
4. Complete registration/login
5. Verify your email if required

---

## Submit to AMO

### Step 1: Start Submission

1. Go to https://addons.mozilla.org/developers/
2. Click **"Submit a New Add-on"**
3. Read and accept the Developer Agreement

### Step 2: Upload Extension

1. Click **"Upload a File"**
2. Select your `.zip` file: `project-bookmark-bars-v1.0.0.zip`
3. Wait for automatic validation
4. Fix any errors (there shouldn't be any)
5. Click **"Continue"**

### Step 3: Choose Distribution

**Option A: "On this site" (Recommended)**
- Your extension will be listed on AMO
- Users can find it by searching
- Gets Firefox's trust badge
- Must pass full review (1-7 days)

**Option B: "On your own"**
- Self-hosted, not listed publicly
- Still signed by Mozilla (required)
- Faster review (automated)
- Use this for testing or private distributions

**Choose:** "On this site" ✅

### Step 4: Fill In Details

#### Name
```
Project Bookmark Bars
```

#### Add-on URL (slug)
```
project-bookmark-bars
```
(Or Mozilla will auto-generate one)

#### Summary (250 chars max)
Copy from **AMO_LISTING.md** (tagline section)

#### Description
Copy the full description from **AMO_LISTING.md**

#### Categories
- Primary: **Bookmarks & Tabs**
- Secondary: **Productivity**

#### Tags
```
bookmarks, productivity, organization, tabs, projects
```

#### Support Email
```
your-email@example.com
```

#### Support Website
```
https://github.com/yourusername/project-bookmark-bars
```

#### Privacy Policy URL
Option 1: Host PRIVACY.md on GitHub
```
https://github.com/yourusername/project-bookmark-bars/blob/main/PRIVACY.md
```

Option 2: Add it directly in the text box (see PRIVACY.md)

#### License
```
MIT License
```

### Step 5: Upload Screenshots

1. Click **"Add Screenshot"**
2. Upload each screenshot
3. Add captions:
   - "Organise bookmarks into multiple project bars"
   - "Drag-and-drop bookmarks between bars, even collapsed ones"
   - "Quick-add your current tab with one click"
   - "Beautiful dark mode support"
   - "Collapsed bars keep your UI clean"

### Step 6: Version Notes

```
Initial release of Project Bookmark Bars!

Features:
- Create unlimited bookmark bars for different projects
- Collapse/expand bars for a clean UI
- Drag-and-drop bookmarks between bars (works on collapsed bars too!)
- Quick-add current tab button
- Open all bookmarks in a bar with one click
- Keyboard shortcuts for fast switching (Alt+Shift+B to open, Alt+. / Alt+, to switch)
- Export/import backup functionality
- Dark mode support
- Privacy-focused: all data stored locally, no tracking

Perfect for developers, researchers, students, and anyone managing multiple projects.
```

### Step 7: Submit for Review

1. Review all information
2. Click **"Submit Version"**
3. Wait for confirmation email

---

## After Submission

### What Happens Next?

1. **Automatic Validation** - Instant (you already passed this)
2. **Human Review** - 1-7 days typically
   - Reviewer checks code for malware, policy violations
   - They may test the extension
   - May ask questions via email

3. **Approval or Rejection**
   - **Approved** → Listed publicly, users can install
   - **Rejected** → Email with reason, you can fix and resubmit

### Review Process Tips

- **Respond quickly** to reviewer questions
- **Be polite and professional** in communications
- **Source code** may be requested if minified/obfuscated (you're fine, all vanilla JS)

### If Rejected

Don't worry! Common reasons:
- Minor permission issues (easy fix)
- Missing privacy policy (add PRIVACY.md)
- Unclear description (revise)

Fix the issue and resubmit—most extensions get approved on second try.

---

## Marketing & Promotion

### Once Approved

Your extension is live! Now promote it:

#### 1. GitHub Repository

Create a GitHub repo:
```bash
cd /home/llew/workspace/z/project-bookmark-bars
git init
git add .
git commit -m "Initial release v1.0.0"
git branch -M main
git remote add origin https://github.com/yourusername/project-bookmark-bars.git
git push -u origin main
```

Add to README.md:
```markdown
## Installation

Install from Firefox Add-ons:
[Project Bookmark Bars](https://addons.mozilla.org/firefox/addon/project-bookmark-bars/)
```

#### 2. Social Media

Post on:
- **Reddit**
  - /r/firefox
  - /r/productivity
  - /r/programming (if relevant)
  - /r/webdev
- **Twitter/X** - Use hashtags: #Firefox #Productivity #Bookmarks
- **LinkedIn** - Professional audience
- **Hacker News** - Show HN post
- **Product Hunt** - Launch there for visibility

Use the promotional copy from **AMO_LISTING.md**

#### 3. Blog Post / Dev.to Article

Write a post about:
- Why you built it
- How it works
- Technical challenges
- Lessons learned

Cross-post to:
- Dev.to
- Medium
- Hashnode
- Your personal blog

#### 4. Firefox Community

- Post in Firefox forums
- Join Firefox Discord/Matrix channels
- Mozilla Add-ons blog (they sometimes feature extensions)

#### 5. Direct Outreach

- Email tech blogs/newsletters
- Message Firefox YouTubers
- Contact productivity bloggers

---

## Version Updates

### When to Update

- **Bug fixes** - As soon as possible
- **New features** - When ready and tested
- **Security patches** - Immediately

### How to Update

1. Make changes to code
2. Update version in `manifest.json`:
   ```json
   "version": "1.0.1"
   ```
3. Package new zip (same process as above)
4. Go to https://addons.mozilla.org/developers/
5. Click your extension
6. Click **"Upload New Version"**
7. Upload zip, fill in version notes
8. Submit

Updates typically approve faster than initial submissions (1-3 days).

---

## Metrics & Analytics

### Track Your Success

AMO provides:
- Daily active users (DAU)
- Total downloads
- Reviews and ratings
- Version distribution

Check at: https://addons.mozilla.org/developers/addon/[your-slug]/statistics/

### Respond to Reviews

- Thank users for positive reviews
- Address bug reports quickly
- Be professional with negative reviews

---

## Troubleshooting

### "Manifest file is invalid"
- Check JSON syntax (no trailing commas)
- Validate with web-ext: `web-ext lint`

### "Icons not loading"
- Make sure icon files are in the zip
- Check paths in manifest.json

### "Version already exists"
- Increment version number in manifest.json

### "Privacy policy required"
- Add PRIVACY.md and link it

### "Reviewers aren't responding"
- Wait up to 7 days
- Check spam folder for emails
- Respond to any reviewer questions in your AMO dashboard

---

## Checklist Summary

**Before packaging:**
- [ ] Test extension thoroughly
- [ ] Update manifest.json (author, homepage, version)
- [ ] Create screenshots (3-5 images)
- [ ] Prepare listing content (AMO_LISTING.md)
- [ ] Write privacy policy (PRIVACY.md)

**Packaging:**
- [ ] Create zip file
- [ ] Verify contents (no unnecessary files)
- [ ] Test zip by loading it in Firefox

**Submission:**
- [ ] Create Mozilla account
- [ ] Upload extension
- [ ] Fill in all details
- [ ] Upload screenshots
- [ ] Submit for review

**After approval:**
- [ ] Create GitHub repo
- [ ] Promote on social media
- [ ] Write blog post
- [ ] Respond to reviews

---

## Need Help?

- **Mozilla Documentation:** https://extensionworkshop.com/
- **Mozilla Community:** https://discourse.mozilla.org/c/add-ons/
- **Stack Overflow:** Tag `firefox-addon`
- **Reddit:** /r/firefox, /r/FirefoxAddons

Good luck with your submission! 🚀
