const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Register user
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('name').notEmpty().withMessage('Name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, name, phone } = req.body;

    // Check if user already exists
    const [userExists] = await pool.execute(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (userExists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, name, phone) VALUES (?, ?, ?, ?, ?)',
      [username, email, passwordHash, name, phone]
    );

    // Get the created user
    const [user] = await pool.execute(
      'SELECT id, username, email, name, is_admin FROM users WHERE id = LAST_INSERT_ID()'
    );

    const createdUser = user[0];

    // Create JWT token
    const token = jwt.sign(
      { userId: createdUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        name: createdUser.name,
        is_admin: createdUser.is_admin
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if user exists by username
    const [result] = await pool.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        is_admin: user.is_admin
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        is_admin: req.user.is_admin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Debug endpoint to test token
router.post('/debug-token', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    console.log('Debug endpoint - Token:', token);
    console.log('Debug endpoint - JWT_SECRET exists:', !!process.env.JWT_SECRET);
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Debug endpoint - Decoded token:', decoded);
    
    const [result] = await pool.execute('SELECT id, username, email, is_admin FROM users WHERE id = ?', [decoded.userId]);
    
    res.json({
      tokenValid: true,
      decoded,
      user: result[0] || null,
      userExists: result.length > 0
    });
  } catch (error) {
    console.log('Debug endpoint - Error:', error.message);
    res.status(400).json({ 
      tokenValid: false, 
      error: error.message 
    });
  }
});

module.exports = router; 