var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sqlConnection = require('../db/index');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

/* GET audio listing. */
router.get('/', function (req, res, next) {
  res.send('respond with an audio resource');
});

router.post('/upload', upload.single('upload-file'), function (req, res, next) {
  const fileMeta = JSON.parse(req.body['upload-meta']);
  const audioFile = req.file;
  const fileContent = fs.readFileSync(audioFile.path);

  // Take the file and save to AWS Bucket and get ID for
  const params = {
    Bucket: process.env.AWS_BUCKET || 'app-plaebak',
    Key: `audio/${fileMeta.name}`, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }

    fileMeta.location = data.Location;
    fileMeta.key = data.Key;

    // Write Meta Data to mySQL DB
    sqlConnection(`INSERT INTO Songs SET ?`, fileMeta, (err, res) => {
      if (err) {
        console.log('error: ', err.message);
        res.json({ message: 'There was an error with saving your file.' });
        return;
      }

      console.log('Saved New Song: ', { id: res.insertId, fileMeta });
    });
  });

  res.json({ message: 'post to /audio/', fileMeta });
});

module.exports = router;
