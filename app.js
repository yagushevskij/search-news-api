require('dotenv').config();
const { addAsync } = require('@awaitjs/express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const errHandler = require('./middlewares/errHandler');
const NotFoundError = require('./classes/NotFoundError');

const { NODE_ENV, DB_CONN } = process.env;
const { PORT = 3000 } = process.env;
const app = addAsync(express());

mongoose.connect(NODE_ENV === 'production' ? DB_CONN : 'mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
