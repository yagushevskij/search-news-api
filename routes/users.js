const router = require('express').Router();
const { getUser, logout } = require('../controllers/users');

router.get('/me', getUser);
router.get('/logout', logout);

module.exports = router;
