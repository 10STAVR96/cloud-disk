const jwtDefault = 'dev-key';
const { mongooseAdress = 'mongodb://localhost:27017/cloud_disk' } = process.env;
const { PORT = 5000 } = process.env;
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};
const filesPath = 'D:\\Users\\1\\Downloads\\dev\\cloud-disk\\cloud-disk-api\\files';

module.exports = {
  jwtDefault,
  mongooseAdress,
  PORT,
  mongooseOptions,
  filesPath,
};
