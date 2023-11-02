const express = require('express');
const router = express.Router();
const { createProduct } = require('../controller/product');
const { requireSignin, adminMiddleware } = require('../common-middlewares');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

const upload = multer({storage: storage});

router.post('/products/create',requireSignin,adminMiddleware, upload.array('productPicture'), createProduct);
// router.get('/products', getProducts);
module.exports = router;