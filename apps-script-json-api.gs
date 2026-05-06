// VICTIG Org Chart - JSON API for GitHub Pages
// Deploy this as a Web App with "Execute as: Me" and "Who has access: Anyone at VICTIG"

function doGet(e) {
  try {
    var data = getOrgData();
    
    var output = ContentService.createTextOutput(JSON.stringify(data));
    output.setMimeType(ContentService.MimeType.JSON);
    
    // Add CORS headers
    return output;
  } catch(error) {
    var errorOutput = ContentService.createTextOutput(JSON.stringify({
      error: error.toString(),
      line: error.lineNumber
    }));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

function getOrgData() {
  var ss = SpreadsheetApp.openById('1rVYp2eBuq8v39arij4Hy-mukstagxTgvHfWE-vlHV6E');
  
  // Read Employees
  var empSheet = ss.getSheetByName('Employees');
  var empData = empSheet.getDataRange().getValues();
  var employees = [];
  
  for (var i = 1; i < empData.length; i++) {
    var row = empData[i];
    if (!row[0]) continue; // Skip empty rows
    
    employees.push({
      id: String(row[0]),
      initials: String(row[1] || ''),
      name: String(row[2] || ''),
      title: String(row[3] || ''),
      department: String(row[4] || ''),
      reportsTo: row[5] ? String(row[5]) : null,
      email: String(row[6] || ''),
      phone: String(row[7] || ''),
      teamId: row[8] ? String(row[8]) : null
    });
  }
  
  // Read Departments
  var deptSheet = ss.getSheetByName('Departments');
  var deptData = deptSheet.getDataRange().getValues();
  var departments = [];
  
  for (var i = 1; i < deptData.length; i++) {
    var row = deptData[i];
    if (!row[0]) continue;
    
    departments.push({
      id: String(row[0]),
      name: String(row[1]),
      reportsTo: row[2] ? String(row[2]) : null,
      color: String(row[3] || '#4A90E2'),
      managerId: row[4] ? String(row[4]) : null
    });
  }
  
  // Read Teams
  var teamSheet = ss.getSheetByName('Teams');
  var teamData = teamSheet.getDataRange().getValues();
  var teams = [];
  
  for (var i = 1; i < teamData.length; i++) {
    var row = teamData[i];
    if (!row[0]) continue;
    
    teams.push({
      id: String(row[0]),
      name: String(row[1]),
      departmentId: String(row[2]),
      leaderId: row[3] ? String(row[3]) : null
    });
  }
  
  return {
    employees: employees,
    departments: departments,
    teams: teams
  };
}
