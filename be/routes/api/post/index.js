const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const SmallCat = require('../../../models/smallCats');
const Post = require('../../../models/posts');

router.post('/', (req, res, next) => {
  const p = req.body;
  SmallCat.findOne({ name: p._smallCat })
    .then(r => {
      if (!r) throw new Error('소분류가 존재하지 않습니다.');
      p._largeCat = r._largeCat
      p._smallCat = r._id
      return Post.create(p)
    })
    .then(r => {
      res.send({ success: true, msg: r });
      console.log(r)
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/list', function(req, res, next) {
  Post.find().populate('_largeCat').populate('_smallCat').select('-content').sort({ '_id': -1 })
    .then(rs => {
      res.send({ success: true, ds: rs });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/list/:smallCat', function(req, res, next) {
  const cat = req.params.smallCat
  SmallCat.findOne({ name: cat })
    .then(r => {
      if (!r) throw new Error('소분류가 존재하지 않습니다.');
      return Post.find({ _smallCat: r._id }).populate('_smallCat', 'name').select('-content').sort({ '_id': -1 })
    })
    .then(rs => {
      console.log(rs)
      res.send({ success: true, ds: rs });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/one/:_id', function(req, res, next) {
  const _id = req.params._id
  Post.findOneAndUpdate({ _id }, { $inc: { "cnt.view": 1 } }, { new: true }).populate('_smallCat')
    .then(r => {
      res.send({ success: true, d: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id;
  Post.findOne({ _id })
    .then(r => {
      if (!r) return next(createError(400, '게시물이 없습니다'));
      return Post.deleteOne({ _id });
    })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`));
});

module.exports = router;