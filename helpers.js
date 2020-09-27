const validator = require('validator');
const { errMessages } = require('./config');

const urlValidator = (link, helpers) => {
  if (validator.isURL(link)) {
    return link;
  }
  return helpers.message(errMessages.urlInvalid);
};

const dateValidator = (date, helpers) => {
  if (validator.isDate(date)) {
    return date;
  }
  return helpers.message(errMessages.dateInvalid);
};

const cookieValidator = (cookie, helpers) => {
  if (cookie && cookie.startsWith('Bearer ')) {
    return cookie;
  }
  return helpers.message(errMessages.authorizationRequired);
};

module.exports = { urlValidator, cookieValidator, dateValidator };
