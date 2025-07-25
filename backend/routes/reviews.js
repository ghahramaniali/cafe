const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all reviews (with optional filters)
router.get('/', async (req, res) => {
  try {
    const { user_id, approved } = req.query;
    let query = `
      SELECT r.*, u.username, u.first_name, u.last_name
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (user_id) {
      paramCount++;
      query += ` AND r.user_id = $${paramCount}`;
      params.push(user_id);
    }

    if (approved === 'true') {
      paramCount++;
      query += ` AND r.is_approved = $${paramCount}`;
      params.push(true);
    }

    query += ' ORDER BY r.id DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get review by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT r.*, u.username, u.first_name, u.last_name
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new review (Authenticated users only)
router.post('/', auth, [
  body('comment').notEmpty().withMessage('Comment is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { comment } = req.body;
    const user_id = req.user.id;
    
    const result = await pool.query(
      'INSERT INTO reviews (user_id, comment) VALUES ($1, $2) RETURNING *',
      [user_id, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update review (User can only update their own reviews)
router.put('/:id', auth, [
  body('comment').notEmpty().withMessage('Comment is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { comment } = req.body;
    const user_id = req.user.id;

    // Check if review exists and belongs to user
    const existingReview = await pool.query(
      'SELECT * FROM reviews WHERE id = $1 AND user_id = $2',
      [id, user_id]
    );
    
    if (existingReview.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found or access denied' });
    }

    const result = await pool.query(
      'UPDATE reviews SET comment = $1 WHERE id = $2 RETURNING *',
      [comment, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete review (User can only delete their own reviews, admin can delete any)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;
    const is_admin = req.user.is_admin;

    let query = 'SELECT * FROM reviews WHERE id = $1';
    let params = [id];

    if (!is_admin) {
      query += ' AND user_id = $2';
      params.push(user_id);
    }

    const existingReview = await pool.query(query, params);
    
    if (existingReview.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found or access denied' });
    }

    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve/Reject review (Admin only)
router.patch('/:id/approve', adminAuth, [
  body('is_approved').isBoolean().withMessage('Approval status is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { is_approved } = req.body;

    const result = await pool.query(
      'UPDATE reviews SET is_approved = $1 WHERE id = $2 RETURNING *',
      [is_approved, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Approve review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reviews
router.get('/user/me', auth, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query(
      `SELECT r.*
       FROM reviews r 
       WHERE r.user_id = $1 
       ORDER BY r.id DESC`,
      [user_id]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get user reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get approved reviews
router.get('/approved/all', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.*, u.username, u.first_name, u.last_name
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.is_approved = true 
       ORDER BY r.id DESC`
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Get approved reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 