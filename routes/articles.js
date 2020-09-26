const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateArticleBody, validateArticleReq } = require('../middlewares/validations');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/:articleId', validateArticleReq, deleteArticle);

module.exports = router;
