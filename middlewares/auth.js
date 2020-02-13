// middlewares/auth.js
const jwt = require('jsonwebtoken');
const FourHundredError = require('../errors/four-hundred-err');

const { NODE_ENV } = process.env;
function checkWorkType() {
  if (NODE_ENV === 'production') {
    const { JWT_SECRET } = process.env;
    return JWT_SECRET;
  }
  return 'dev-secret';
}
const jwtSecretKey = checkWorkType();
module.exports = (req, res, next) => {
  // console.log(req.cookies.jwt);
  const token = req.cookies.jwt;

  if (!token) {
    throw new FourHundredError('401 Необходима авторизация', 401);
  }
  let payload;

  try {
    payload = jwt.verify(token, jwtSecretKey);
    if (!payload) {
      throw new FourHundredError('401 Необходима авторизация', 401);
    }
  } catch (err) {
    return next();
  }
  req.user = payload;
  return next();
};
