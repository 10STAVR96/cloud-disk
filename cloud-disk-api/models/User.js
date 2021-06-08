const { model, Schema, ObjectId } = require('mongoose');
const validator = require('validator');
const bcript = require('bcryptjs');
const { wrongAuthData } = require('../utils/const');

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Enter correct email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 2,
    maxlength: 500,
  },
  diskSpace: {
    type: Number,
    default: 1024 ** 3 * 10,
  },
  usedSpace: {
    type: Number,
    default: 0,
  },
  files: [{
    type: ObjectId,
    ref: 'File',
  }],
});

User.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(wrongAuthData));
      }
      return bcript.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(wrongAuthData));
          }
          return user;
        });
    });
};

module.exports = model('User', User);
