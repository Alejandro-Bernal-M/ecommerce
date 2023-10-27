const { check, validationResult } = require('express-validator');

exports.validateUserRequestSignup = [
  check('firstName')
  .notEmpty()
  .withMessage('firstName is required'),
  check('lastName')
  .notEmpty()
  .withMessage('lastName is required'),
  check('email')
  .isEmail()
  .withMessage('Valid email is required'),
  check('password')
  .isLength({min: 6})
  .withMessage('password must be atleast 6 characters')
];


