const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  const fileKey = 'audio-demo-two.mp3';

  const params = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${fileKey}`, // File name you want to save as in S3
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = uploadFile;
