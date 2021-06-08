require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { mongooseAdress, PORT, mongooseOptions } = require('./utils/config');
const fileRouter = require('./routes/file');
const authRouter = require('./routes/auth');
const errorsHandler = require('./middlewares/errors-handler');

const app = express();
app.use(cors({ origin: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/files', fileRouter);

app.use(errors());

app.use(errorsHandler);

const start = async () => {
  try {
    await mongoose.connect(mongooseAdress, mongooseOptions);

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
