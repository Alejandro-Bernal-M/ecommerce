const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middlewares');

router.post('/category/create',requireSignin,adminMiddleware, createCategory);
router.get('/categories', getCategories);
module.exports = router;