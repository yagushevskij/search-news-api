const mongoose = require('mongoose');
const { errMessages } = require('../config');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  title: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  text: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  date: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  source: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  link: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  image: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
    required: [true, errMessages.fieldRequired],
  },
});

module.exports = mongoose.model('article', articleSchema);
