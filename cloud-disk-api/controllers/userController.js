const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const NotFoundError = require('../errors/not-found-err');
const ConflictDataError = require('../errors/conflict-data-err');
const LoginError = require('../errors/login-err');
const { jwtDefault } = require('../utils/config');
const { notFoundUser, suchEmailExists } = require('../utils/const');
const fileService = require('../middlewares/fileService');
const File = require('../models/File');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcript.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    await fileService.createDir(new File({ user: user._id, name: '' }));
    res.status(200).send({
      message: 'User was created', _id: user._id, email, diskSpace: user.diskSpace, usedSpace: user.usedSpace,
    });
  } catch (e) {
    console.log(e);
    next(new ConflictDataError(suchEmailExists));
  }
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDefault,
        { expiresIn: '7d' },
      );
      res.status(200).send({ token, user });
    })
    .catch((e) => next(new LoginError(e.message)));
};
module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) throw new NotFoundError(notFoundUser);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : jwtDefault,
      { expiresIn: '7d' },
    );
    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
      },
    });
  } catch (e) {
    return next;
  }
};
