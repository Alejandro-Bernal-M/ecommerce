const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controller/category')

router.post('/category/create', createCategory);
router.get('/categories', getCategories);
module.exports = router;