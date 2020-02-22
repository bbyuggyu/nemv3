const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const sharp = require('sharp')
const imageDataURI = require('image-data-uri')
const fs = require('fs')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  console.log(9, req.body)
  console.log(10, req.file)

  sharp(req.file.path).resize(200,200).crop(sharp.strategy.entropy).toBuffer()
    .then(bf => {
      fs.unlinkSync(req.file.path)
      res.send(imageDataURI.encode(bf, 'png'))
    })
    .catch(e => next(e))
})

module.exports = router