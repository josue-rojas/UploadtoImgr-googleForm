# UploadtoImgr-googleForm
Google Sheets Script to change Image Uploads to direct image links using imgur

## Setup
After you have your form to accept image uploads and have linked your google sheet

- on the menubar click on 'Tools' on the sheets -> then click on 'Script Editor'
- copy the script.gs to google scripts
- change id_column_pos for the column number of image upload links in Sheets
- change deletehash_column_pos for the column position for deletehash column
- change CLIENT_ID for your client id for imgur api
- on the scripts menu go to 'Edit' -> then 'All Your Triggers'
- add a trigger to Run: onSubmitForm, Events: From spreadSheet, On Form Submit
- it might ask you to give permissions like gdrive, and sheets.
- that is it.. wait for inputs and enjoy direct image links
