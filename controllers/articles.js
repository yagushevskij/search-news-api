const Article = require('../models/article');
const NotFoundError = require('../classes/NotFoundError');
const ForbiddenError = require('../classes/ForbiddenError');

const getArticles = async (req, res, next) => {
  try {
    res.json(await Article.find({ owner: req.user._id }));
  } catch (err) {
    next(err);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    const result = await Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const result = await Article.findById(req.params.articleId).select('+owner').orFail(new NotFoundError('Новость не найдена'));
    if ((result.owner) && JSON.stringify(req.user._id) === JSON.stringify(result.owner._id)) {
      result.remove(() => { res.json(result); });
    } else {
      next(new ForbiddenError('Действие запрещено'));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
