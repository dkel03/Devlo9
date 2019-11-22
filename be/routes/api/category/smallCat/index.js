const express = require('express');
const createError = require('http-errors');
const router = express.Router();

/* 모델 import */
const LargeCat = require('../../../../models/largeCats');
const SmallCat = require('../../../../models/smallCats');
const Post = require('../../../../models/posts');

router.get('/list', function(req, res, next) {
  SmallCat.find().populate('_largeCat', 'name')
    .then(rs => {
      res.send({ success: true, ds: rs });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/one/:smallCat', function(req, res, next) {
  const smallCat = req.params.smallCat
  SmallCat.findOne({ name: smallCat }).populate('_largeCat')
    .then(r => {
      res.send({ success: true, d: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.post('/', (req, res, next) => {
  const s = req.body;
  SmallCat.create(s)
    .then(r => {
      res.send({ success: true, msg: r });
      console.log(r)
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.put('/:id', (req, res, next) => {
  const _id = req.params.id;
  SmallCat.findOne({ _id })
    .then((r) => {
      if (!r) return next(createError(400, '카테고리가 없습니다'))
      return SmallCat.updateOne({ _id }, { $set: req.body })
    })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id;
  Post.deleteMany({ _smallCat: _id })
    .then(r => {
      if (!r) return new Promise(null)
      return SmallCat.deleteOne({ _id })
    })
    .then(r => {
      console.log(r)
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    })
})

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`));
});

module.exports = router;