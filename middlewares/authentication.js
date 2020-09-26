const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../classes/UnauthorizedError');

const { JWT_SECRET } = require('../config.js');
const { errMessages } = require('../config.js');

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(new UnauthorizedError(errMessages.authorizationRequired));
    } else {
      const token = authorization.replace('Bearer ', '');
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    }
  } catch (err) {
    next(new UnauthorizedError(errMessages.authorizationRequired));
  }
};
