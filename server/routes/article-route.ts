import * as express from 'express';
import Article from '../model/article';

const router = express.Router();

// get all articles
router.get('/articles', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) {
      return next(err);
    }
    res.send(articles);
  });
});

// create new article
router.post('/articles/new', (req, res, next) => {
  const { title, author, description, content } = req.body;
  Article.create({ title, author, description, content }, (err, article) => {
    if (err) {
      return next(err);
    }
    res.send(article);
  });
});

// get single article
router.get('/articles/:id', (req, res, next) => {
  const { id } = req.params;
  Article.findById(id, (err, article) => {
    if (err) {
      return next(err);
    }
    res.send(article);
  });
});

// update article
router.post('/articles/update/:id', (req, res, next) => {
  const { id } = req.params;
  const { title, author, description, content } = req.body;
  Article.findByIdAndUpdate(
    id,
    { title, author, description, content },
    (err, updatedArticle) => {
      if (err) {
        return next(err);
      }
      res.send(updatedArticle);
    }
  );
});

// delete article
router.post('/articles/delete/:id', (req, res, next) => {
  const { id } = req.params;
  Article.findByIdAndRemove(id, (err, removedArticle) => {
    if (err) {
      return next(err);
    }
    res.send(removedArticle);
  });
});

export default router;
