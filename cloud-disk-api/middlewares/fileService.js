const fs = require('fs');
const { filesPath } = require('../utils/config');

class FileService {
  getPath(file) {
    return `${filesPath}\\${file.user}\\${file.path}`;
  }

  createDir(file) {
    const curFilePath = this.getPath(file);
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(curFilePath)) {
          fs.mkdirSync(curFilePath);
          return resolve({ message: 'File was created' });
        }
        return reject({ message: 'File already exist' });
      } catch (e) {
        console.log(e);
        return reject({ message: 'File error' });
      }
    });
  }

  deleteFile(file) {
    const path = this.getPath(file);
    file.type === 'dir' ? fs.rmdirSync(path) : fs.unlinkSync(path);
  }
}

module.exports = new FileService();
