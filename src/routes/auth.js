const express = require('express');
const router = express.Router();
const { signup, signin } = require('../controller/auth')
const { validateUserRequestSignup, isValidRequest, validateUserRequestSignin } = require('../validators/auth')

router.post('/signin', validateUserRequestSignin, isValidRequest, signin);
router.post('/signup',validateUserRequestSignup, isValidRequest,signup);


module.exports = router;