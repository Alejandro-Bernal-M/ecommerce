const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controller/admin/auth')
const { validateUserRequestSignup, isValidRequest, validateUserRequestSignin }= require('../../validators/auth')

router.post('/admin/signin',validateUserRequestSignin, isValidRequest, signin);
router.post('/admin/signup',validateUserRequestSignup, isValidRequest,signup);


module.exports = router;