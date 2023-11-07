const express = require('express');
const router = express.Router();
const { addItemToCart } = require('../controller/cart');
const { requireSignin, userMiddleware } = require('../common-middlewares');

router.post('/user/cart/additem', requireSignin, userMiddleware, addItemToCart);

module.exports = router;