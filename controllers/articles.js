// controllers/articles.js
const Article = require('../models/article');
const FourHundredError = require('../errors/four-hundred-err');

const routerArticle = (req, res, next) => {
  const owner = req.user._id;
  return Article.find({ owner })
    .then((e) => {
      if (!e) {
        throw new FourHundredError('404 Not Found', 404);
      }
      res.send({ data: e });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((e) => {
      if (!e) {
        throw new FourHundredError('400 Error incorrect data, ', 400);
      }
      res.send({ data: e });
    })
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id: userId } = req.user;
  Article.findById(articleId)
    .then((e) => {
      if (!e) {
        throw new FourHundredError('404 Error', 404);
      }
      if (e.owner.equals(userId)) {
        Article.deleteOne(e)
          .then(() => {
            res.send({ data: e, message: 'been removed' });
          })
          .catch(next);
      } else {
        throw new FourHundredError('403 access not allowed', 403);
      }
    })
    .catch(next);
};

module.exports = {
  routerArticle,
  createArticle,
  deleteArticle,
};
