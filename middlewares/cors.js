const corsOptions = {
  origin: [
    'https://turbomegapro.ru',
    'http://localhost:8080',
    'https://yagushevskij.github.io'
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token'
  ],
  credentials: true
}

module.exports = {
  corsOptions,
};
