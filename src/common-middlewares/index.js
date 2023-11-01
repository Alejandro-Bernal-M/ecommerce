const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  console.log('user',user)
  next();
}

exports.adminMiddleware = (req, res, next) => {
  if(req.user.role != 'admin'){
    return res.status(400).json({message: 'Access denied'})
  };
  next();
}