function(instance, properties, context) {

const getFileDetails = async (fileUrl) => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blob = await response.blob();

    // Convert size
    let size = blob.size;
    let sizeUnit = 'bytes'; // Default to bytes
    
    // Decide correct unit and convert if necessary
    if (size >= 1024 * 1024) { // >= 1 MB
      size = (size / (1024 * 1024)).toFixed(2);
      sizeUnit = 'MB';
    } else if (size >= 1024) { // >= 1 KB and < 1 MB
      size = (size / 1024).toFixed(2);
      sizeUnit = 'KB';
    } // if size < 1 KB, it's already in bytes

    // Simplify MIME type for certain image types
    const fileTypeMapping = {
      'application/pdf': 'PDF',
      'image/png': 'PNG',
      'image/gif': 'GIF',
      'image/jpeg': 'JPG'
    };
    const type = fileTypeMapping[blob.type] || blob.type; // Fallback to full MIME type if not in the mapping

    // Displaying the results on the screen
      instance.publishState('content_length',size + ' ' + sizeUnit);
      instance.publishState('content_type',type);
  } catch (error) {
    console.error('Error fetching the file:', error);
  }
};

// Call this function with the file URL
getFileDetails(properties.file_url);
}