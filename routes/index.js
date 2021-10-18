var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('upload'), function (req, res, next) {
  const fileMeta = JSON.parse(req.body['upload-meta']);

  console.log('req.file', req.file);
  res.json({ message: 'Hello from the backend.', fileMeta });
});

module.exports = router;
