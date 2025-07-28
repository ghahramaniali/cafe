const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    console.log('Auth middleware - Token received:', token ? 'Yes' : 'No');
    console.log('Auth middleware - JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    if (!token) {
      console.log('Auth middleware - No token provided');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Auth middleware - Token decoded successfully:', { userId: decoded.userId });
    
    const [result] = await pool.execute('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    console.log('Auth middleware - Database query result:', { 
      rowsFound: result.length,
      userFound: result.length > 0 ? { id: result[0].id, username: result[0].username } : null
    });
    
    if (result.length === 0) {
      console.log('Auth middleware - User not found or not active');
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = result[0];
    console.log('Auth middleware - Authentication successful for user:', req.user.username);
    next();
  } catch (error) {
    console.log('Auth middleware - Error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (!req.user.is_admin) {
        return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
      }
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = { auth, adminAuth }; 