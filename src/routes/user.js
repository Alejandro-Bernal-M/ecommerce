const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.post('/signin', (req,res) => {

});


router.post('/signup', async(req, res) => {
  const userFound = await User.findOne({email: req.body.email});

  if(userFound){
    return res.status(400).json({message: 'User already exists'});
  }else {
    const {firstName, lastName, username, password, email} = req.body;
    const newUser = new User({
      firstName,
      lastName,
      username,
      password,
      email
    });
    const savedUser = await newUser.save();
    if(savedUser === newUser){
      return res.json({user: savedUser});
    }else{
      return res.status(400).json({message: 'Error saving the user'});
    }
  }
});


module.exports = router;