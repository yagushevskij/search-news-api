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
  description: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  publishedAt: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  source:
  {
    name: {
      type: String,
      required: [true, errMessages.fieldRequired],
    },
  },
  url: {
    type: String,
    required: [true, errMessages.fieldRequired],
  },
  urlToImage: {
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
