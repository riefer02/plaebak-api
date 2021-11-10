var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/* GET audio listing. */
router.get('/', function (req, res, next) {
  res.send('respond with an audio resource');
});

router.post('/', upload.single('upload'), function (req, res, next) {
  const fileMeta = JSON.parse(req.body['upload-meta']);
  const file = req.file;

  res.json({ message: 'post to /audio/', fileMeta, file });
});

module.exports = router;
