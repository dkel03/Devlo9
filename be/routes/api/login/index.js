const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const cfg = require('../../../../config')

router.post('/', function(req, res, next) {
  if (req.body.id === cfg.admin.id) {
    if (req.body.pw === cfg.admin.pw) {
      res.send({ success: true, msg: '로그인 성공' })
    } else {
      res.send({ success: false, msg: '비밀번호가 틀립니다.'})
    }
  } else
    res.send({ success: false, msg: '등록된 id가 아닙니다.'})
});

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`));
});

module.exports = router;