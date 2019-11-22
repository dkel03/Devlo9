var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* 모델 import */
const LargeCat = require('../../../models/largeCats');
const SmallCat = require('../../../models/smallCats');

/* 하위 카테고리 자원 접근 */
router.use('/largeCat', require('./largeCat'));
router.use('/smallCat', require('./smallCat'));


/* 카테고리 전체 관련 */
router.get('/', function(req, res, next){
  let categories = []
  LargeCat.find()
    .then(rs => {
      if(!rs) throw new Error('대분류가 존재하지 않습니다.');
      categories = rs.map((el) => {
        return {
          _id: el._id,
          name: el.name, 
          smallCats: []
        }
      })
      return SmallCat.find().populate('_largeCat')
    })
    .then(rs => {
      if(!rs) throw new Error('소분류가 존재하지 않습니다.') 
      for(var i=0; i<rs.length; i++){
        for(var j=0; j<categories.length; j++){
          if(categories[j].name === rs[i]._largeCat.name){
            categories[j].smallCats.push(rs[i])
          }
        }
      }
      res.send({ success: true, ds: categories });
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    });
})

router.all('*', function(req, res, next) {
  next(createError(404, `${req.path} not found`))
});

module.exports = router;