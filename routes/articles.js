// routes/users.js
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// url val
const { urlRegex, imgRegex } = require('../errors/validateRegex');

const {
  routerArticle,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', routerArticle);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(urlRegex),
    image: Joi.string().required().regex(imgRegex),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);


module.exports = router;
