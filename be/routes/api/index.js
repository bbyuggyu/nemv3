var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment');
const cfg = require('../../../config');

router.use('/sign', require('./sign'))
router.use('/site', require('./site'))
router.use('/register', require('./register'))

const verifyToken = (t) => {
  console.log(13, t)
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
}

const signToken = (_id, id, lv, name, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    }
    if (rmb) o.expiresIn = cfg.jwt.expiresInRemember // 6일
    jwt.sign({ _id, id, lv, name, rmb }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

const getToken = async(t) => {
  let vt = await verifyToken(t)
  if (vt.lv > 2) return { user: vt, token: null }
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  // return vt
  console.log(45, diff)
  if (diff > (vt.exp - vt.iat) / cfg.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt._id, vt.id, vt.lv, vt.name, vt.rmb)
  vt = await verifyToken(nt)
  return { user: vt, token: nt }
}

router.all('*', function(req, res, next) {
  // 토큰 검사
  getToken(req.headers.authorization)
    .then((v) => {
      console.log(57, v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
})

router.use('/page', require('./page'))
router.use('/manage', require('./manage'))
router.use('/test', require('./test'))
router.use('/user', require('./user'))
router.use('/board', require('./board'))
router.use('/article', require('./article'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어요.'));
});

module.exports = router;