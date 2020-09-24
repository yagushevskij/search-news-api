const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../classes/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { devTokenSecretKey } = require('../data.js');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError('Необходима авторизация'));
    } else {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : devTokenSecretKey);
      req.user = payload;
      next();
    }
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};
