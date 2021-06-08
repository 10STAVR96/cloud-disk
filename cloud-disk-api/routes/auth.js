const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const { login, createUser, getUserInfo } = require('../controllers/userController');

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(500),
  }),
}), login);
authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(500),
  }),
}), createUser);
authRouter.get('/auth', auth, getUserInfo);

module.exports = authRouter;
