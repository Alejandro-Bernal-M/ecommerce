const User = require('../models/user')

exports.signup = async (req, res) => {
  const userFoundByEmail = await User.findOne({email: req.body.email});
  const userFoundByUsername = await User.findOne({username: req.body.username});

  if(userFoundByEmail || userFoundByUsername){
    return res.status(400).json({message: 'User already exists'});
  }else {
    try{const {firstName, lastName, username, password, email} = req.body;
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
  }catch(error){
    console.log(error);
    console.log('------------------------')
    console.log(error.errors)
    return res.status(400).json({message: 'Something went wrong', errors: error.errors})
  }
  }
}
