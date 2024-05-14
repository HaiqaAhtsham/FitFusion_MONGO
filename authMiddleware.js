const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Import your User model

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEF');
    req.user = decoded;

    // Check if the user exists in the database
    const existingUser = await User.findById(req.user.userId);
    if (!existingUser) {
      return res.status(403).send('User not found');
    }

    // Check if the role in the token is 'user'
    if (req.user.role !== 'user') {
      return res.status(403).send('Unauthorized User access');
    }

    next();
  } catch (error) {
    return res.status(403).send('Invalid token');
   }
};
const checkUserRole = (req, res, next) => {
    if (req.user.role === 'user') { 
      next();
    } else {
      return res.status(403).send('Unauthorized User access ');
    }
  };
  const checkAdminRole = (req, res, next) => {
      if (req.user.role === 'admin') {     
        next();
      } else {
        return res.status(403).send('Unauthorized access ');
      }
  };
    
  
module.exports = { verifyToken, checkAdminRole, checkUserRole };
