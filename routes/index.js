var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('upload'), function (req, res, next) {
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  res.json({ message: 'Hello from the backend.' });
});

module.exports = router;
