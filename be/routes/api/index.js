var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/blogInfo', require('./blogInfo'));
router.use('/category', require('./category'));
router.use('/login', require('./login'));
router.use('/post', require('./post'));

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;