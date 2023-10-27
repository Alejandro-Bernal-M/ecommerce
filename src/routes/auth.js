const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../controller/auth')
const { validateUserRequestSignup, isValidRequest, validateUserRequestSignin } = require('../validators/auth')

router.post('/signin', validateUserRequestSignin, isValidRequest, signin);
router.post('/signup',validateUserRequestSignup, isValidRequest,signup);
router.post('/profile',requireSignin, (req, res) => {
  res.json({message: 'profile', user: req.user})
})


module.exports = router;