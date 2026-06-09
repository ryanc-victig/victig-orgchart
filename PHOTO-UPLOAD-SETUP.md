# Photo Upload Setup Guide

This guide explains how to set up the Google Drive photo upload feature for the VICTIG Org Chart.

## Overview

Employees can upload their profile photos directly from the org chart. Photos are stored in a Google Drive folder and automatically linked to their profile.

## Setup Steps

### 1. Google Drive Folder (Already Created ✅)

- **Folder Name:** VICTIG Employee Photos
- **Folder ID:** `16nlRZSA8kTyfLGs4OX9oXdXzQ8yv1htC`
- **Link:** https://drive.google.com/drive/folders/16nlRZSA8kTyfLGs4OX9oXdXzQ8yv1htC
- **Account:** ryanc@victig.com

### 2. Deploy the Apps Script Web App

1. Go to https://script.google.com (signed in as ryanc@victig.com)

2. Click **+ New project**

3. Delete the default code and paste the contents of `apps-script-photo-upload.gs`

4. Click **💾 Save** and name the project "VICTIG Photo Upload Handler"

5. **Deploy as Web App:**
   - Click **Deploy** → **New deployment**
   - Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
   - Fill in:
     - **Description:** VICTIG Photo Upload API
     - **Execute as:** Me (ryanc@victig.com)
     - **Who has access:** Anyone
   - Click **Deploy**

6. **Authorize the script:**
   - Click **Authorize access**
   - Choose ryanc@victig.com account
   - Click **Advanced** → **Go to VICTIG Photo Upload Handler (unsafe)**
   - Click **Allow**

7. **Copy the Web App URL:**
   - After deployment, you'll see a URL like:
     ```
     https://script.google.com/macros/s/AKfycby.../exec
     ```
   - Copy this URL

### 3. Update the Org Chart

1. Open `index.html` in a text editor

2. Find this line (around line 3205):
   ```javascript
   const scriptUrl = 'YOUR_APPS_SCRIPT_WEB_APP_URL';
   ```

3. Replace `YOUR_APPS_SCRIPT_WEB_APP_URL` with the URL you copied:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. Save the file

5. Commit and push to GitHub:
   ```bash
   cd ~/.openclaw/workspace/victig-orgchart
   git add index.html
   git commit -m "Add Apps Script URL for photo uploads"
   git push origin main
   ```

### 4. Test It!

1. Open the org chart: https://ryanc-victig.github.io/victig-orgchart/

2. Click on your employee card to edit

3. Click **📤 Upload Photo**

4. Select an image (under 5MB)

5. Wait for "✓ Photo uploaded!" message

6. Click **Save**

7. Your photo should now appear instead of initials!

## How It Works

1. Employee clicks "Upload Photo" button
2. Selects an image file from their computer
3. File is converted to base64 and sent to Apps Script
4. Apps Script:
   - Saves the file to the Google Drive folder
   - Sets sharing to "Anyone with link can view"
   - Returns a direct image URL
5. The URL is automatically filled into the Photo URL field
6. When they click Save, their photo is displayed everywhere in the org chart

## File Naming

Photos are automatically named using the employee's name:
- Example: `Ryan_Cauffman_1717964400000.jpg`
- Old photos are automatically deleted when a new one is uploaded

## Troubleshooting

**Upload fails:**
- Check that the Apps Script URL is correct in `index.html`
- Verify the Apps Script is deployed with "Anyone" access
- Check browser console for errors

**Photo doesn't display:**
- Make sure the file is shared (script does this automatically)
- Clear browser cache and reload
- Verify the URL in the Photo URL field starts with `https://drive.google.com/uc?export=view&id=`

**Permission errors:**
- Re-authorize the Apps Script
- Verify ryanc@victig.com has access to the folder

## Next Steps

Once set up, all employees can:
- Upload their own photos (no technical knowledge needed)
- Update their photos anytime
- Add interests and hobbies to their profile

Photos will display in:
- Employee cards on the org chart
- Department manager sections
- Executive cards
- Directory listing
