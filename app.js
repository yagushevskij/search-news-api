require('dotenv').config();
const { addAsync } = require('@awaitjs/express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isCelebrate } = require('celebrate');

const errHandler = require('./middlewares/errHandler');
const NotFoundError = require('./classes/NotFoundError');
const { errMessages, sysMessages } = require('./config.js');
const { DB_CONN, PORT } = require('./config.js');
const routes = require('./routes');

const app = addAsync(express());

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use((err, req, res, next) => {
  if (isCelebrate(err)) {
    return next(err.joi);
  }
  return next(err);
});
app.use((req, res, next) => {
  next(new NotFoundError(errMessages.resourceNotFound));
});
app.use(errHandler);

app.listen(PORT, () => console.log(sysMessages.appListen));
