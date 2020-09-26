const validator = require('validator');
const ValidationError = require('./classes/ValidationError');
const UnauthorizedError = require('./classes/UnauthorizedError');
const { errMessages } = require('./config');

const urlValidator = (link) => {
  if (validator.isURL(link)) {
    return link;
  }
  throw new ValidationError(errMessages.urlValidation);
};

const dateValidator = (date) => {
  if (validator.isDate(date)) {
    return date;
  }
  throw new ValidationError(errMessages.dateValidation);
};

const cookieValidator = (cookie) => {
  if (!cookie || !cookie.startsWith('Bearer ')) {
    throw new UnauthorizedError(errMessages.authorizationRequired);
  }
  return cookie;
};

module.exports = { urlValidator, cookieValidator, dateValidator };
