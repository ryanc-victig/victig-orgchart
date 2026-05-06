// Google Apps Script API for VICTIG Org Chart
// This script provides secure, org-only access to the employee data

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Sheet not found'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Convert to array of objects
    const employees = rows.map(row => {
      const employee = {};
      headers.forEach((header, index) => {
        employee[header] = row[index] || '';
      });
      return employee;
    }).filter(emp => emp.Name); // Filter out empty rows
    
    // Return JSON
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      employees: employees,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (run this in Apps Script editor to verify it works)
function testAPI() {
  const result = doGet();
  Logger.log(result.getContent());
}
