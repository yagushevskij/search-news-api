const { celebrate, Joi } = require('celebrate');
const escape = require('escape-html');
const { urlValidator, dateValidator, cookieValidator } = require('../helpers');

const validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().trim()
      .min(2)
      .max(30)
      .custom(escape),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateAuthHeaders = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().custom(cookieValidator),
  }).unknown(true),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim()
      .custom(escape),
    title: Joi.string().required().trim()
      .custom(escape),
    text: Joi.string().required().trim()
      .custom(escape),
    date: Joi.string().required().custom(dateValidator),
    source: Joi.string().required().trim()
      .custom(escape),
    link: Joi.string().required().custom(urlValidator),
    image: Joi.string().required().custom(urlValidator),
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
  validateAuthHeaders,
  validateArticleBody,
  validateArticleReq,
};
