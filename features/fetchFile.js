const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');

const fetchFile = (filename, res) => {
  console.log(filename);

  const getParams = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${filename}.mp3`,
  };

  s3.getSignedUrl('getObject', getParams, function (err, data) {
    if (err) {
      return res.status(400).send({ success: false, err: err });
    } else {
      console.log(data);
      return res.download(data);
    }
  });
};

module.exports = fetchFile;
