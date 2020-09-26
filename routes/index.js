const router = require('express').Router();

const userRouter = require('./users.js');
const articleRouter = require('./articles.js');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');
const { login, createUser } = require('../controllers/users.js');
const {
  validateSignInBody, validateSignUpBody, validateAuthHeaders,
} = require('../middlewares/validations.js');

router.post('/signin', validateSignInBody, login);
router.post('/signup', validateSignUpBody, createUser);
router.use(validateAuthHeaders, authentication);
router.use(authorization);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;
