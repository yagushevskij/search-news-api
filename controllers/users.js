const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../classes/NotFoundError');
const UnauthorizedError = require('../classes/UnauthorizedError');
const { errMessages, resultMessages, JWT_SECRET } = require('../config');

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
      email, username,
    } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await User.createUser({
      username, email, password,
    });
    res.json(result);
  } catch (err) {
    if ((err.name === 'MongoError') && (err.code === 11000)) {
      err.statusCode = 409;
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    if (user) {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 7 * 1000, httpOnly: true, sameSite: true,
      }).send(user);
    } else {
      next(new UnauthorizedError(errMessages.wrongAuthData));
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie('jwt', '', { httpOnly: true, sameSite: true }).send({ message: resultMessages.logout });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser, createUser, login, logout,
};
