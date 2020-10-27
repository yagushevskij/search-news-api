const validator = require('validator');
const { errMessages } = require('./config');

const urlValidator = (link, helpers) => {
  if (validator.isURL(link)) {
    return link;
  }
  return helpers.message(errMessages.urlInvalid);
};

const dateValidator = (date, helpers) => {
  if (validator.isISO8601(date)) {
    return date;
  }
  return helpers.message(errMessages.dateInvalid);
};

module.exports = { urlValidator, dateValidator };
