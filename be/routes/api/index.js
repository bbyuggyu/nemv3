var express = require('express');
var createError = require('http-errors');
var router = express.Router();


router.use('/user', require('./user'))
router.use('/test', require('./test'))
router.use('/sign', require('./sign'))

router.all('*', function(req, res, next) {
  // 토큰 검사
  next() 
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요.'));
});

module.exports = router;