const { errMessages } = require('../config');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    res.status(400).json({ message: err.message });
    return;
  }
  if ((err.name === 'MongoError') && (err.code === 11000)) {
    res.status(409).json({ message: err.message });
    return;
  }
  res.status(statusCode).json({
    message: statusCode === 500 ? errMessages.serverError : message,
  });
  next();
};
