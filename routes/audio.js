const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fetchFile = require('../features/fetchFile');
const uploadFile = require('../features/uploadFile');
const getSongs = require('../features/getSongs');

router.get('/songs', async function (req, res, next) {
  const allSongs = getSongs()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  res.json(allSongs);
});

router.get('/:file_name', function (req, res, next) {
  fetchFile(req.params.file_name, res);
});

router.post('/upload', upload.single('upload-file'), function (req, res, next) {
  uploadFile(req, res);
});

module.exports = router;
