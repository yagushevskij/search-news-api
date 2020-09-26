const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../classes/NotFoundError');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages } = require('../config.js');

const { JWT_SECRET } = require('../config.js');

const getUser = async (req, res, next) => {
  try {
    const result = await User.findById(req.user._id)
      .orFail(new NotFoundError(errMessages.userNotFound));
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const {
      email, name,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUser({
      name, email, password,
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password').orFail(new UnauthorizedError(errMessages.wrongAuthData));
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (isPassCorrect) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true, sameSite: true }).end();
    } else {
      next(new UnauthorizedError(errMessages.wrongAuthData));
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser, createUser, login,
};
