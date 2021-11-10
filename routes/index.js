const express = require('express');
const router = express.Router();
const multer = require('multer');
const sqlConnection = require('../db/index');
const upload = multer({ dest: 'uploads/' });

// Demo Route Write to DB
router.get('/create', function (req, res, next) {
  const newSong = { SongName: 'Dayzee Lords' };

  sqlConnection(`INSERT INTO Songs SET ?`, newSong, (err, res) => {
    if (err) {
      console.log('error: ', err);
      return;
    }

    console.log('created new song: ', { id: res.insertId, ...newSong });
  });

  res.json({ title: 'Write to DB Demo Route' });
});

// Demo Route File Upload
router.post('/', upload.single('upload'), function (req, res, next) {
  const fileMeta = JSON.parse(req.body['upload-meta']);

  console.log('req.file', req.file);
  res.json({ message: 'Hello from the backend.', fileMeta });
});

module.exports = router;
