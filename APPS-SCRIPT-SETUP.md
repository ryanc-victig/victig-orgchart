# Apps Script JSON API Setup

## The Problem
The org chart needs to load fresh data from your Google Sheet, but the old Apps Script was returning HTML instead of JSON.

## The Solution
Deploy this new JSON API that returns pure data.

## Steps to Deploy

1. **Open Google Apps Script**
   - Go to: https://script.google.com
   - Click "New Project"

2. **Paste the Code**
   - Delete the default `function myFunction()` code
   - Copy ALL the code from `apps-script-json-api.gs` in this repo
   - Paste it into the script editor
   - Click the floppy disk icon to save
   - Name it: "VICTIG Org Chart JSON API"

3. **Deploy as Web App**
   - Click "Deploy" button (top right)
   - Choose "New deployment"
   - Click the gear icon next to "Select type"
   - Choose "Web app"
   - Fill in:
     - **Description**: "Org Chart JSON API"
     - **Execute as**: Me (your @victig.com email)
     - **Who has access**: Anyone at VICTIG
   - Click "Deploy"

4. **Copy the URL**
   - You'll see a "Web app URL" like:
     `https://script.google.com/a/macros/victig.com/s/AKfycby.../exec`
   - Copy this entire URL

5. **Update index.html**
   - Open `index.html` in this repo
   - Find the line: `const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/victig.com/s/...'`
   - Replace the URL with your new one
   - Commit and push

6. **Test**
   - Wait 30 seconds for GitHub Pages to rebuild
   - Open: https://ryanc-victig.github.io/victig-orgchart/
   - It should load automatically from Google Sheets
   - Both Matt and Brent should be BLUE

## What if it still doesn't work?

Open browser console (Cmd+Option+J on Mac) and look for errors. The page now shows detailed error messages.

## Security
- The Apps Script requires you to be logged into a @victig.com Google account
- Data is NOT publicly accessible - GitHub repo can be public, data stays private
- Only people in your organization can see the data
