require('dotenv').config();
const { addAsync } = require('@awaitjs/express');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { isCelebrate } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = require('./middlewares/cors');
const errHandler = require('./middlewares/errHandler');
const NotFoundError = require('./classes/NotFoundError');
const { errMessages, sysMessages } = require('./config');
const { DB_CONN, PORT } = require('./config');
const routes = require('./routes');

const app = addAsync(express());
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use((err, req, res, next) => {
  if (isCelebrate(err)) {
    const error = err.joi;
    error.statusCode = 400;
    return next(error);
  }
  return next(err);
});
app.use((req, res, next) => {
  next(new NotFoundError(errMessages.resourceNotFound));
});
app.use(errHandler);

app.listen(PORT, () => console.log(sysMessages.appListen));
