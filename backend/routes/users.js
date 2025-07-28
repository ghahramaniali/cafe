const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all users (Admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute(
      'SELECT id, name, phone, is_admin FROM users ORDER BY id DESC'
    );
    res.json(result);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID (Admin only)
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(
      'SELECT id, name, phone, is_admin FROM users WHERE id = ?',
      [id]
    );
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (Admin only)
router.put('/:id', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, phone, is_admin } = req.body;

    const [result] = await pool.execute(
      'UPDATE users SET name = ?, phone = ?, is_admin = ? WHERE id = ?',
      [name, phone, is_admin, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the updated user
    const [updatedUser] = await pool.execute(
      'SELECT id, name, phone, is_admin FROM users WHERE id = ?',
      [id]
    );

    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change user password (Admin only)
router.patch('/:id/password', adminAuth, [
  body('new_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { new_password } = req.body;

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(new_password, salt);

    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [passwordHash, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle user admin status (Admin only)
router.patch('/:id/toggle-admin', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'UPDATE users SET is_admin = NOT is_admin WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the updated user
    const [updatedUser] = await pool.execute(
      'SELECT id, is_admin FROM users WHERE id = ?',
      [id]
    );

    res.json({ 
      message: `User ${updatedUser[0].is_admin ? 'promoted to admin' : 'removed from admin'} successfully`,
      is_admin: updatedUser[0].is_admin 
    });
  } catch (error) {
    console.error('Toggle user admin status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user statistics (Admin only)
router.get('/stats/overview', adminAuth, async (req, res) => {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN is_admin = true THEN 1 END) as admin_users
      FROM users
    `);

    res.json(stats[0]);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 