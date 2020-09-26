const { JWT_SECRET = 'jwt-secret-key' } = process.env;
const { DB_CONN = 'mongodb://localhost:27017/news' } = process.env;
const { PORT = 3000 } = process.env;
const errMessages = {
  resourceNotFound: 'Запрашиваемый ресурс не найден',
  newsNotFound: 'Новость не нейдена',
  delNotOwnNewsProhibited: 'Удаление чужих новостей запрещено',
  userNotFound: 'Пользователь не найден',
  wrongAuthData: 'Неверный логин или пароль',
  serverError: 'На сервере произошла ошибка',
  authorizationRequired: 'Необходима авторизация',
  dateValidation: 'Введена невалидная дата',
  urlValidation: 'Введен невалидный URL',
};
const sysMessages = {
  appListen: `App listening on port ${PORT}`,
};
module.exports = {
  JWT_SECRET, DB_CONN, PORT, errMessages, sysMessages,
};
