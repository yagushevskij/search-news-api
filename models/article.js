const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  title: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  text: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  date: {
    type: Date,
    required: [true, 'Обязательное поле'],
  },
  source: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
    required: [true, 'Обязательное поле'],
  },
});

module.exports = mongoose.model('article', articleSchema);
