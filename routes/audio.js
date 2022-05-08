const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const fetchFile = require('../features/fetchFile');
const uploadFile = require('../features/uploadFile');

router.get('/:file_name', function (req, res, next) {
  fetchFile(req.params.file_name, res);
});

router.get('/songs', (req, res, next)=>{
  const allSongs = await prisma.songs.findMany()
  res.json(allSongs);
})

router.post('/upload', upload.single('upload-file'), function (req, res, next) {
  uploadFile(req, res);
});



module.exports = router;
