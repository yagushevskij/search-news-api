const Article = require('../models/article');
const NotFoundError = require('../classes/NotFoundError');
const ForbiddenError = require('../classes/ForbiddenError');
const { errMessages } = require('../config.js');

const getArticles = async (req, res, next) => {
  try {
    res.json(await Article.find({ owner: req.user._id }).populate('owner'));
  } catch (err) {
    next(err);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const {
      keyword, title, description, publishedAt, source, url, urlToImage,
    } = req.body;
    const result = await Article.create({
      keyword,
      title,
      description,
      publishedAt,
      url,
      urlToImage,
      source,
      owner: req.user._id,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const result = await Article.findById(req.params.articleId).select('+owner').orFail(new NotFoundError(errMessages.newsNotFound));
    if ((result.owner) && JSON.stringify(req.user._id) === JSON.stringify(result.owner._id)) {
      result.remove(() => { res.json(result); });
    } else {
      next(new ForbiddenError(errMessages.delNotOwnNewsProhibited));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getArticles, createArticle, deleteArticle,
};
