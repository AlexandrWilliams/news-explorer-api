// app.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const limiter = require('./rate_limiter/rate_limiter');

require('dotenv').config();

const { NODE_ENV } = process.env;
function checkWorkType() {
  if (NODE_ENV === 'production') {
    const { DATA_BASE_ADRESS } = process.env;
    return `${DATA_BASE_ADRESS}`;
  }
  return 'mongodb://localhost:27017/yandexFinal';
}

const dataBaseAdress = checkWorkType();
// winston blue
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(dataBaseAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);
app.use(requestLogger);

app.use(require('./routes/index'));
// errors
// winston err logger
app.use(errorLogger);
app.use(errors()); // celebrate
app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT);
