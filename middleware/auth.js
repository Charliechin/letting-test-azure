const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

  // get token from Header 
  const token = req.header('x-auth-token');
  // check if not token exists
  if (!token) {
    return res.status(401).json({ msg: 'no token, auth denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtTokenSecret'))
    req.user = decoded.user;
    next();

  } catch (error) {
    console.error(error.message);
    res.status(401).json({ msg: 'Invalid token' })

  }

}