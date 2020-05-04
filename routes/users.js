// routes/users.js
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, loginUser, routerUsers, signOut } = require('../controllers/users');

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
router.delete('/me', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), signOut);

module.exports = router;
