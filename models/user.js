// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const FourHundredError = require('../errors/four-hundred-err');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

function findUserByCredentialsFunc(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new FourHundredError('Неправильные почта или пароль', 401);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new FourHundredError('Неправильные почта или пароль', 401);
          }
          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentialsFunc;

userSchema.path('email').validate((val) => validator.isEmail(val), 'Invalid Email.');

module.exports = mongoose.model('User', userSchema);
