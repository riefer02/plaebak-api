const express = require('express');
const router = express.Router();
const multer = require('multer');
const sqlConnection = require('../db/index');
const upload = multer({ dest: 'uploads/' });

// console.log(sqlConnection);

/* GET home page. */
router.get('/create', function (req, res, next) {
  // console.log(req);
  const newSong = { SongName: 'Hello World' };
  console.log(newSong);

  sqlConnection(`INSERT INTO Songs SET ?`, newSong, (err, res) => {
    if (err) {
      console.log('error: ', err);
      // result(err, null);
      return;
    }

    console.log('created new song: ', { id: res.insertId, ...newSong });
    // result(null, { id: res.insertId, ...newSong });
  });

  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('upload'), function (req, res, next) {
  const fileMeta = JSON.parse(req.body['upload-meta']);

  console.log('req.file', req.file);
  res.json({ message: 'Hello from the backend.', fileMeta });
});

module.exports = router;
