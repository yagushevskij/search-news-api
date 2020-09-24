const { celebrate, Joi } = require('celebrate');
const escape = require('escape-html');
const { login, createUser } = require('../controllers/users.js');
const { users } = require('./users.js');
const { articles } = require('./articles.js');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const { cookieValidator } = require('../helpers.js');

module.exports = (app) => {
  app.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login);

  app.post('/signup', celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().trim()
        .min(2)
        .max(30)
        .custom(escape),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), createUser);

  app.use(celebrate({
    headers: Joi.object().keys({
      authorization: Joi.string().required().custom(cookieValidator),
    }).unknown(true),
  }), authentication);
  app.use(authorization);

  app.use('/users', users);
  app.use('/articles', articles);
};
