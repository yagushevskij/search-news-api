const { celebrate, Joi } = require('celebrate');
const escape = require('escape-html');
const { urlValidator, dateValidator } = require('../helpers');
const { errMessages } = require('../config');

const validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUpBody = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().trim()
      .min(2)
      .max(30)
      .custom(escape),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateAuthCookies = celebrate({
  headers: Joi.object().keys({
    cookie: Joi.string(),
  }).messages({
    'string.required': errMessages.authorizationRequired,
  }).unknown(true),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .custom(escape),
    title: Joi.string().required().trim()
      .custom(escape),
    description: Joi.string().required().trim()
      .custom(escape),
    publishedAt: Joi.string().required().custom(dateValidator),
    source: Joi.object().keys({
      name: Joi.string().required().trim()
        .custom(escape),
    }),
    url: Joi.string().required().custom(urlValidator),
    urlToImage: Joi.string().required().custom(urlValidator),
  }),
});

const validateArticleReq = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = {
  validateSignInBody,
  validateSignUpBody,
  validateAuthCookies,
  validateArticleBody,
  validateArticleReq,
};
