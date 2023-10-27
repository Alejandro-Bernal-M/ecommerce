const jwt = require('jsonwebtoken');

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
}