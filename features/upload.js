const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  //   console.log(fileContent);

  const fileKey = 'audio-demo-two.mp3';

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${fileKey}`, // File name you want to save as in S3
    Body: fileContent,
  };

  //   Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

uploadFile('../uploads/bong song_rev 1_inst mix.mp3');
