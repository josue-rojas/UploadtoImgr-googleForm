/*
* this function gets active sheet (the sheet that is link to this script)
* then get the cell of last entry, more sspecifically the one containing the link to the upload
* then uploads to imgur and gets its link
* replaces the upload link to a direct link using imgur
*/
function onSubmitForm(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  // 'https://drive.google.com/open?id='.length might chaage to regex in case the links change
  const id_substring = 33;
  // this is where image upload link is located, last row and the column where image upload links appear
  const id_row_pos = sheet.getLastRow();
  const id_column_pos = 2;
  const range_cell = sheet.getRange(id_row_pos, id_column_pos);
  // just need id from the link (might chaage to regex)
  const image_id = (range_cell.getValue()).substring(id_substring);
  const image = DriveApp.getFileById(image_id);
  const imgur = imageToIMGUR(image);
  range_cell.setValue(imgur[0]);

  //finally add a the deletehash somewhere
  const deletehash_column_pos = 8;
  sheet.getRange(id_row_pos, deletehash_column_pos).setValue(imgur[1]);
}


/*
* This function takes in a image and uploads to imgur
*/
function imageToIMGUR(image) {
  const CLIENT_ID = ''; //REPLACE WITH YOUR CLIENT ID
  const URL = 'https://api.imgur.com/3/image';
  const blob = image.getBlob();
  const image_base64 = Utilities.base64Encode(blob.getBytes());
  const options = {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      'Authorization': 'Client-ID '+ CLIENT_ID
    },
    'payload': JSON.stringify({
      'image': image_base64,
    }),
    'muteHttpExceptions': true
  };
  const responce = UrlFetchApp.fetch(URL, options);
  const responceJSON = JSON.parse(responce.getContentText());
  const link = responceJSON.data.link;
  const deletehash = responceJSON.data.deletehash;
  return [link, deletehash];
}
