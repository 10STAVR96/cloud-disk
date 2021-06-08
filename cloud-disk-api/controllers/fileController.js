const fs = require('fs');
const { filesPath } = require('../utils/config');
const fileService = require('../middlewares/fileService');
const File = require('../models/File');
const User = require('../models/User');

module.exports.createDir = async (req, res) => {
  try {
    const { name, type, parent } = req.body;
    const file = new File({
      name, type, parent, user: req.user._id,
    });
    const parentFile = await File.findOne({ _id: parent });
    if (!parentFile) {
      file.path = name;
      await fileService.createDir(file);
    } else {
      file.path = `${parentFile.path}\\${file.name}`;
      await fileService.createDir(file);
      parentFile.childs.push(file._id);
      await parentFile.save();
    }
    await file.save();
    return res.json(file);
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};
module.exports.uploadFile = async (req, res) => {
  try {
    const { file } = req.files;
    const parent = await File.findOne({ user: req.user._id, _id: req.body.parent });
    const user = await User.findOne({ _id: req.user._id });
    const type = file.name.split('.').pop();
    let filePath = file.name;
    let path;

    if (user.usedSpace + file.size > user.diskSpace) {
      return res.status(400).send({ message: 'There no space on the disk' });
    }

    user.usedSpace += file.size;

    if (parent) {
      path = `${filesPath}\\${user._id}\\${parent.path}\\${file.name}`;
    } else {
      path = `${filesPath}\\${user._id}\\${file.name}`;
    }

    if (fs.existsSync(path)) {
      return res.status(400).send({ message: 'File already exist' });
    }

    await file.mv(path);

    if (parent) {
      filePath = `${parent.path}\\${file.name}`;
    }

    const dbFile = new File({
      name: file.name,
      type,
      size: file.size,
      path: filePath,
      parent: typeof (parent) === Object && '_id' in parent ? parent._id : null,
      user: user._id,
    });

    await dbFile.save();
    await user.save();

    return res.status(200).send(dbFile);
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: 'Upload error' });
  }
};
module.exports.deleteFile = async (req, res) => {
  try {
    console.log(req);
  } catch (e) {
    console.log(e);
    res.send({ message: 'Delete file error' });
  }
};
module.exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ user: req.user._id, parent: req.query.parents });
    return res.json(files);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Can not get files' });
  }
};
