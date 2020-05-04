// controllers/users.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const FourHundredError = require('../errors/four-hundred-err');

const routerUsers = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((e) => {
      if (!e) {
        throw new FourHundredError('404 Not Found', 404);
      }
      res.send({ email: e.email, name: e.name });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.find({ email })
    .then((elem) => {
      if (elem.length > 0) {
        throw new FourHundredError('409 user with same data already been signup', 409);
      }
      if (elem.length === 0) {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email, password: hash, name,
          }))
          .then((e) => res.send({
            _id: e._id, email: e.email, name: e.name,
          }))
          .catch(next);
      }
    })
    .catch(next);
};
const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((e) => {
      if (!e) {
        throw new FourHundredError('401 Cant find user', 401);
      }
      const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      const token = jwt.sign({ _id: e._id }, jwtKey, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ req: true });
      // .end();
    })
    .catch(next);
};

const signOut = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((e) => {
       if (!e) {
        throw new FourHundredError('401 Cant find user', 401);
      }
      const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
      const token = jwt.sign({ _id: userId }, jwtKey, { expiresIn: '1s' });
      res.cookie('jwt', token, {
        maxAge: 0,
        httpOnly: true,
      });
      res.send({ req: true });
      // .end();
    })
    .catch(next);
};

module.exports = {
  routerUsers,
  loginUser,
  createUser,
  signOut
};
