# Google Apps Script Setup Guide

This guide will help you deploy a secure API for your org chart that keeps data restricted to victig.com users.

## Step 1: Open Your Google Sheet

1. Open your org chart Google Sheet: https://docs.google.com/spreadsheets/d/1rVYp2eBuq8v39arij4Hy-mukstagxTgvHfWE-vlHV6E/edit
2. Make sure the first sheet (tab) is named "Sheet1" or update the script accordingly
3. Ensure the first row contains headers: `ID`, `Initials`, `Name`, `Title`, `Department`, `ReportsTo`, `Email`, `Phone`

## Step 2: Add the Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy all the code from `apps-script-api.gs` (in this folder)
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) and name it "Org Chart API"

## Step 3: Test the Script

1. In the Apps Script editor, select the function `testAPI` from the dropdown
2. Click **Run** (▶️)
3. You may need to authorize the script (click "Review Permissions" → choose your account → "Allow")
4. Check the **Execution log** at the bottom - you should see JSON data with your employees

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
3. Configure the deployment:
   - **Description:** "VICTIG Org Chart API"
   - **Execute as:** Me (your email)
   - **Who has access:** **Anyone with Google Account in victig.com** ← This is the key setting!
4. Click **Deploy**
5. **IMPORTANT:** Copy the **Web app URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
6. Save this URL somewhere safe (you'll need it in the next step)

## Step 5: Update the Org Chart

Once you have the Web app URL, send it to me and I'll update the chart code to use it instead of the direct Sheets API.

Alternatively, you can update it yourself:
1. Open `index.html` in the GitHub repo
2. Find the line: `const SHEET_URL = ...`
3. Replace it with: `const SHEET_URL = 'YOUR_APPS_SCRIPT_URL_HERE';`
4. Remove the line that starts with `const json = JSON.parse(text.substr(47)...`
5. Replace it with: `const json = JSON.parse(text);`
6. Commit and push the changes

## Step 6: Set Sheet Permissions

Now you can safely restrict your Google Sheet:
1. Click **Share** (top right of your Sheet)
2. Change to: **Restricted** → Only people with access
3. Add victig.com users as needed (Viewer permission is fine)

## Troubleshooting

**"Script function not found: doGet"**
- Make sure you saved the script after pasting the code

**"Authorization required"**
- Click "Review Permissions" and authorize the script with your Google account

**"TypeError: Cannot read property 'getSheetByName'"**
- Make sure your sheet tab is named "Sheet1" or update the script

**Data not loading on the chart**
- Check the browser console (F12) for errors
- Verify the Apps Script URL is correct
- Make sure you're logged into a victig.com Google account

## Security Notes

✅ Only victig.com users can access the API
✅ Sheet can be fully restricted (no "anyone with link")
✅ No API keys or tokens exposed publicly
✅ Apps Script runs with your permissions (read-only for the API)

---

**Need help?** Just ask Kelly! 💕
