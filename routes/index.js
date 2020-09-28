const router = require('express').Router();

const userRouter = require('./users');
const articleRouter = require('./articles');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const {
  validateSignInBody, validateSignUpBody, validateAuthCookies,
} = require('../middlewares/validations');

router.post('/signin', validateSignInBody, login);
router.post('/signup', validateSignUpBody, createUser);
router.use(validateAuthCookies, auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = router;
