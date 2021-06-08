const { serverError } = require('../utils/const');

module.exports = (err, req, res, next) => {
  console.log(err);
  const { statusCode = 500, message } = err;
  return res
    .status(statusCode)
    .send({ message: statusCode === 500 ? serverError : message });
};
