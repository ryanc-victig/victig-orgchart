# Update Google Sheets for Employee Reordering

## What Changed
Added a `SortOrder` column to track employee order within teams. This allows drag-and-drop reordering that persists across page reloads.

## Steps to Update

### 1. Open Google Apps Script
1. Go to your Google Sheets: https://docs.google.com/spreadsheets/d/1rVYp2eBuq8v39arij4Hy-mukstagxTgvHfWE-vlHV6E/edit
2. Click **Extensions** → **Apps Script**

### 2. Replace the Script Code
1. Select all the existing code in the editor
2. Delete it
3. Copy the entire contents of `apps-script-two-way-sync.gs` from this repo
4. Paste it into the Apps Script editor

### 3. Deploy the Updated Version
1. Click **Deploy** → **Manage deployments**
2. Click the ✏️ (edit) icon next to the active deployment
3. Under "Version", click **New version**
4. Add description: "Added SortOrder support for employee reordering"
5. Click **Deploy**
6. Copy the new Web App URL (should be the same as before)

### 4. Test It
1. Refresh your org chart page
2. Drag an employee to a new position within their team
3. Refresh the page - the employee should stay in the new position

## What the Update Does
- **Read**: Column J (SortOrder) is now read from the Employees sheet
- **Write**: When saving, sortOrder is written back to Column J
- Employees display in sortOrder within their teams
- Drag-and-drop updates sortOrder and saves to Google Sheets

## Troubleshooting
If employees still don't stay in position:
1. Check the Apps Script execution log (View → Executions)
2. Make sure you're logged into a @victig.com account
3. Try manually adding a "SortOrder" header to column J in the Employees sheet
