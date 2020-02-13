// routes/users.js
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, loginUser, routerUsers } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), loginUser);
router.get('/me', routerUsers);

module.exports = router;
