const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const BlogInfo = require('../../../models/blogInfo');

router.get('/app', function(req, res, next) {
  BlogInfo.find()
    .then(rs => {
      const _id = rs[0]._id
      return BlogInfo.findOneAndUpdate({ _id }, { $inc: { "cnt.visit": 1 } }, { new: true }).select('author')
    })
    .then(r => {
      res.send({ success: true, d: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.get('/home', function(req, res, next) {
  BlogInfo.find()
    .then(rs => {
      const _id = rs[0]._id
      return BlogInfo.findOne({ _id })
    })
    .then(r => {
      res.send({ success: true, d: r });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
});

router.put('/', (req, res, next) => {
  BlogInfo.find()
    .then(rs => {
      const _id = rs[0]._id
      return BlogInfo.updateOne({ _id }, { $set: req.body })
    })
    .then(r => {
      res.send({ success: true, msg: r });
    })
    .catch(e => {
      res.send({ success: 'failed', msg: e.message });
    });
});


router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`));
});

module.exports = router;