# Privacy Policy for Project Bookmark Bars

**Last Updated:** 2025-10-26

## Overview

Project Bookmark Bars is committed to protecting your privacy. This extension does not collect, transmit, or share any personal data. All your bookmark data stays on your device.

## Data Collection

**We collect NO data.**

Specifically:
- ❌ No browsing history
- ❌ No personal information
- ❌ No analytics or telemetry
- ❌ No cookies
- ❌ No tracking
- ❌ No advertisements

## Data Storage

### What Is Stored Locally

Project Bookmark Bars stores the following data **on your device only** using Firefox's `browser.storage.local` API:

1. **Bookmark bar names** - The names you give to your bookmark bars (e.g., "Work", "Personal")
2. **Bookmark data** - Titles and URLs of bookmarks you add
3. **Preferences** - Active bar ID and collapsed/expanded state of each bar

This data is stored in:
- **Location:** Firefox's local extension storage (IndexedDB)
- **Access:** Only this extension can access it
- **Persistence:** Remains until you uninstall the extension or manually delete it

### No Cloud Sync

Project Bookmark Bars does **not** use Firefox Sync or any cloud service. Your data is never transmitted to any server.

### Data Export

You can export your data at any time:
1. Open the extension sidebar
2. Click "Export" at the bottom
3. A JSON file will download to your computer

This file contains all your bookmark bars and bookmarks in plain text format. You control this file—we never see it.

## Permissions Explained

Project Bookmark Bars requests the following permissions:

### `storage`
**Purpose:** Store your bookmark bars and preferences locally on your device.
**Data accessed:** None. Only data you create within the extension.

### `tabs`
**Purpose:** Access the current tab's title and URL when you click "Add Current Tab".
**Data accessed:** Only the active tab, only when you explicitly click the "Add Current Tab" button.
**Not used for:** Background tracking, reading tab history, or monitoring your browsing.

## Third-Party Services

### Favicon Service

When displaying bookmark favicons (the small icons next to bookmark titles), the extension uses Google's public favicon service:
```
https://www.google.com/s2/favicons?domain=[domain]&sz=32
```

**What this means:**
- When you add a bookmark, your browser fetches the favicon from Google
- Google may log the domain name (e.g., "github.com") in their server logs
- This is a standard web request—similar to loading any image from Google
- **No personal data is sent** (no user IDs, cookies, or tracking)

**How to avoid this:**
If you don't want your browser to fetch favicons from Google, the extension will fall back to a generic bookmark emoji (🔖) if the favicon fails to load. No configuration needed.

## Your Rights

You have complete control over your data:

### Right to Access
- Your data is stored locally—you can view it anytime
- Export your data using the "Export" button

### Right to Deletion
- Delete individual bookmarks using the delete button (✕)
- Delete entire bookmark bars using the delete button
- Uninstall the extension to remove all data

### Right to Portability
- Export your data as JSON
- Import your data into a new installation
- Use the data however you wish

## Updates to This Policy

If we ever change this privacy policy (e.g., to add new features), we will:
1. Update the "Last Updated" date above
2. Notify users through the extension update notes
3. Post the new policy on GitHub (if applicable)

We will **never** introduce tracking or data collection without clear notice.

## Contact

If you have questions or concerns about privacy:

**GitHub Issues:** https://github.com/Llewdur/project-bookmark-bars/issues
**Email:** llewdurandt@gmail.com

## Compliance

### GDPR (EU)
Project Bookmark Bars is GDPR-compliant because:
- No personal data is collected
- No data is processed on servers
- No profiling or automated decision-making
- Users have full control over their data

### CCPA (California)
Project Bookmark Bars is CCPA-compliant because:
- No personal information is sold
- No personal information is shared
- Users can delete all data by uninstalling

### Mozilla Add-ons Policy
Project Bookmark Bars complies with Mozilla's Add-on Policies:
- No surprise collection of user data
- Clear description of permissions
- Open source code available for inspection

## Open Source

Project Bookmark Bars is open source. You can inspect the code to verify these claims:

**GitHub Repository:** https://github.com/Llewdur/project-bookmark-bars

The code is licensed under the MIT License, allowing anyone to audit, modify, or redistribute it.

## Summary

**TL;DR:**
- ✅ All data stored locally on your device
- ✅ No tracking, analytics, or data collection
- ✅ No servers, no cloud, no third parties (except favicon images)
- ✅ You control your data—export and delete anytime
- ✅ Open source code for transparency

Your privacy is important to us. This extension was built with privacy as a core principle, not an afterthought.

---

**Last Updated:** 2025-10-26
**Version:** 1.0
