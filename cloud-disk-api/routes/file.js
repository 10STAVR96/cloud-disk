const fileRouter = require('express').Router();
const {
  createDir,
  uploadFile,
  deleteFile,
  getFiles,
} = require('../controllers/fileController');
const auth = require('../middlewares/auth');

fileRouter.post('', auth, createDir);
fileRouter.post('/upload', auth, uploadFile);
fileRouter.delete('', auth, deleteFile);
fileRouter.get('', auth, getFiles);

module.exports = fileRouter;
