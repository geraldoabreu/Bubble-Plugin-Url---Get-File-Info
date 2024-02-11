function(instance, properties, context) {
    
var url = properties.file_url

var xhr = new XMLHttpRequest();
xhr.open("HEAD", url);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
        // Convert size
        let size = xhr.getResponseHeader('content-length');
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
    	const type = fileTypeMapping[xhr.getResponseHeader('content-type')] || xhr.getResponseHeader('content-type'); // Fallback to full MIME type if not in the mapping
       
      
        // Displaying the results on the screen
          instance.publishState('content_length',size + ' ' + sizeUnit);
          instance.publishState('content_type',type);
   }};

xhr.send();
}