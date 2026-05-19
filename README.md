# VICTIG Org Chart

Interactive organizational chart for VICTIG.

## Files

- **`index.html`** - Main org chart visualization (open this to view the chart)
- **`editor.html`** - Employee list editor (drag-and-drop to reorder employees)
- **`data-fixed.json`** - Employee and department data

## How to Reorder Employees

1. Open **`editor.html`** in your browser
2. It will auto-load `data-fixed.json`
3. Drag and drop employees to reorder them
4. Click **"Download Updated JSON"** to save your changes
5. Replace `data-fixed.json` with the downloaded file
6. Refresh `index.html` to see the updated chart

## Editing Employee Data

Edit `data-fixed.json` directly:

```json
{
  "id": "unique-id",
  "name": "Full Name",
  "initials": "FN",
  "title": "Job Title",
  "department": "Department Name",
  "reportsTo": "Manager Name",
  "teamId": "team-id"
}
```

## GitHub Pages

This chart is hosted at: https://ryanc-victig.github.io/victig-orgchart/

Any commits to `main` branch will automatically update the live version.
