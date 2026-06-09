# Employee Photo Upload Guide

## For Employees: How to Add Your Photo

1. **Click on your name** in the org chart to open your employee details
2. **Click the "📤 Upload Photo" button**
3. **Select your photo** (JPEG/PNG, under 5MB)
4. **Wait for the success message** - your photo is uploaded to Google Drive
5. **Click Save** to save your employee record

**Note:** Your photo will display automatically within 1 hour. The system syncs uploaded photos every hour via GitHub Actions.

---

## How It Works (Automated)

When you upload a photo:
1. **Photo goes to Google Drive** (temporary staging area)
2. **GitHub Actions runs every hour** and checks for new uploads
3. **Photos are automatically downloaded** to the repo's `photos/` folder
4. **Changes are committed and deployed** to the live site
5. **Your photo appears** on the org chart (usually within 1 hour)

**No manual steps required!** ✨

---

## For Admins: Manual Sync (Optional)

If you need to sync photos immediately instead of waiting for the hourly automatic sync:

### Option 1: Trigger GitHub Action Manually
1. Go to [GitHub Actions](https://github.com/ryanc-victig/victig-orgchart/actions)
2. Click "Auto-sync Employee Photos"
3. Click "Run workflow" → "Run workflow"
4. Photos will sync in ~30 seconds

### Option 2: Run Script Locally
```bash
cd ~/.openclaw/workspace/victig-orgchart
./sync-photos.sh
git add photos/ data.json
git commit -m "Add employee photos"
git push origin main
```

---

## Troubleshooting

### Photo not displaying after upload
- **Cause:** Google Drive URLs don't work due to browser security (CSP)
- **Fix:** An admin needs to run `sync-photos.sh` to download and commit the photo

### Photo quality issues
- **Best format:** JPEG or PNG
- **Recommended size:** 800x800 pixels or larger (square ratio works best)
- **Max file size:** 5MB

### Script errors
If `sync-photos.sh` fails, check:
- You're in the `victig-orgchart` directory
- You have `curl` installed
- The Google Drive file is publicly accessible (link sharing enabled)

---

## Photo Storage Locations

- **Google Drive folder:** "VICTIG Employee Photos" (temporary staging)
- **GitHub repository:** `photos/` folder (permanent, displays on site)
- **Live site:** `https://ryanc-victig.github.io/victig-orgchart/photos/`

---

## Privacy & Permissions

- Photos uploaded via the org chart are stored in the shared "VICTIG Employee Photos" Google Drive folder
- Once committed to GitHub, photos are publicly accessible (the org chart is a public website)
- Employees can update or remove their photos at any time by editing their profile
