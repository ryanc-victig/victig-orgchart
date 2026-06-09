# Employee Photo Upload Guide

## For Employees: How to Add Your Photo

1. **Click on your name** in the org chart to open your employee details
2. **Click the "📤 Upload Photo" button**
3. **Select your photo** (JPEG/PNG, under 5MB)
4. **Wait for the success message** - your photo is uploaded to Google Drive
5. **Click Save** to save your employee record

**Note:** Your photo won't display immediately. It needs to be approved and committed by an admin (usually within 24 hours).

---

## For Admins: How to Sync Uploaded Photos

When employees upload photos, they go to Google Drive first. To make them display on the org chart, you need to download them and commit them to the GitHub repository.

### Quick Method (Automated Script)

Run this command from the org chart directory:

```bash
./sync-photos.sh
```

This script will:
1. Find all Google Drive photo URLs in `data.json`
2. Download each photo to the `photos/` folder
3. Update `data.json` to use local paths
4. Show you the next steps to commit and push

After running the script:

```bash
git add photos/ data.json
git commit -m "Add employee photos"
git push origin main
```

### Manual Method

If you prefer to do it manually:

1. **Find the Google Drive URL** in `data.json`:
   ```json
   "photoUrl": "https://drive.google.com/uc?export=view&id=1D5q9zuVkfDvfZSoYQxqyQc5iFJWwgi9a"
   ```

2. **Download the photo**:
   ```bash
   curl -L "https://drive.google.com/uc?export=download&id=FILE_ID_HERE" -o photos/employee-name.jpg
   ```

3. **Update `data.json`** to use the local path:
   ```json
   "photoUrl": "photos/employee-name.jpg"
   ```

4. **Commit and push**:
   ```bash
   git add photos/employee-name.jpg data.json
   git commit -m "Add photo for Employee Name"
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
