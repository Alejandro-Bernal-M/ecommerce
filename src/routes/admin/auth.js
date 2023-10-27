const express = require('express');
const router = express.Router();
const { signup, signin, requireSignin } = require('../../controller/admin/auth')
const { validateUserRequestSignup, isValidRequest, validateUserRequestSignin }= require('../../validators/auth')

router.post('/admin/signin',validateUserRequestSignin, isValidRequest, signin);
router.post('/admin/signup',validateUserRequestSignup, isValidRequest,signup);
router.post('/profile',requireSignin, (req, res) => {
  res.json({message: 'profile', user: req.user})
})


module.exports = router;