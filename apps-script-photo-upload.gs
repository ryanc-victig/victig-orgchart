// VICTIG Org Chart - Photo Upload Handler
// This Apps Script receives employee photo uploads and saves them to Google Drive

const PHOTO_FOLDER_ID = '16nlRZSA8kTyfLGs4OX9oXdXzQ8yv1htC'; // VICTIG Employee Photos folder

function doPost(e) {
  try {
    // Get the uploaded file
    const fileBlob = e.parameter.file ? Utilities.newBlob(
      Utilities.base64Decode(e.parameter.file),
      e.parameter.mimeType,
      e.parameter.fileName
    ) : null;
    
    if (!fileBlob) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'No file provided'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the employee name for the filename
    const employeeName = e.parameter.employeeName || 'unknown';
    const sanitizedName = employeeName.replace(/[^a-zA-Z0-9_-]/g, '_');
    
    // Get the folder
    const folder = DriveApp.getFolderById(PHOTO_FOLDER_ID);
    
    // Delete existing photo for this employee (if any)
    const existingFiles = folder.getFilesByName(sanitizedName);
    while (existingFiles.hasNext()) {
      existingFiles.next().setTrashed(true);
    }
    
    // Upload the new photo
    const file = folder.createFile(fileBlob);
    file.setName(sanitizedName + '_' + Date.now()); // Add timestamp to prevent caching issues
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Generate direct image URL
    const fileId = file.getId();
    const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      url: directUrl,
      fileId: fileId
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ready',
    message: 'VICTIG Photo Upload API'
  })).setMimeType(ContentService.MimeType.JSON);
}
