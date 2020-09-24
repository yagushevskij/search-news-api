const articles = require('express').Router();
const escape = require('escape-html');
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { urlValidator, dateValidator } = require('../helpers.js');

articles.get('/', getArticles);
articles.post('/', celebrate({
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
}), createArticle);
articles.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).hex(),
  }),
}), deleteArticle);

module.exports = { articles };
