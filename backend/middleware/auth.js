const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1. Get token from header (Format: Authorization: Bearer <token>)
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1]; // Extract token after "Bearer "
  if (!token) {
    return res.status(401).json({ message: 'Token missing, authorization denied' });
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3. Attach user data to request object
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
