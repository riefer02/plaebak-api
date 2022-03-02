const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const sqlConnection = require('../db/index');

const uploadFile = (req, res) => {
  const fileMeta = JSON.parse(req.body['upload-meta']);
  const audioFile = req.file;
  const fileContent = fs.readFileSync(audioFile.path);

  const params = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${fileMeta.name}`,
    Body: fileContent,
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }

    fileMeta.location = data.Location;
    fileMeta.key = data.Key;

    sqlConnection(`INSERT INTO Songs SET ?`, fileMeta, (err, res) => {
      if (err)
        return res.json({
          message: 'There was an error with saving your file.',
        });
    });
  });

  res.json({
    message: 'Post request to /audio/upload was successful',
    fileMeta,
  });
};

module.exports = uploadFile;
