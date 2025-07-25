const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category_id, available, favorite } = req.query;
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      JOIN categories c ON p.category_id = c.id 
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (category_id) {
      paramCount++;
      query += ` AND p.category_id = $${paramCount}`;
      params.push(category_id);
    }

    if (available === 'true') {
      paramCount++;
      query += ` AND p.is_available = $${paramCount}`;
      params.push(true);
    }

    if (favorite === 'true') {
      paramCount++;
      query += ` AND p.is_favorite = $${paramCount}`;
      params.push(true);
    }

    query += ' ORDER BY p.name';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product (Admin only)
router.post('/', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('category_id').isUUID().withMessage('Valid category ID is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('description').optional(),
  body('image_url').optional(),
  body('is_available').optional().isBoolean(),
  body('is_favorite').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      name, 
      category_id, 
      price, 
      description, 
      image_url, 
      is_available = true, 
      is_favorite = false 
    } = req.body;

    // Check if category exists
    const categoryResult = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ message: 'Category not found' });
    }
    
    const result = await pool.query(
      `INSERT INTO products (name, category_id, price, description, image_url, is_available, is_favorite) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [name, category_id, price, description, image_url, is_available, is_favorite]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (Admin only)
router.put('/:id', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('category_id').isUUID().withMessage('Valid category ID is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('description').optional(),
  body('image_url').optional(),
  body('is_available').optional().isBoolean(),
  body('is_favorite').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { 
      name, 
      category_id, 
      price, 
      description, 
      image_url, 
      is_available, 
      is_favorite 
    } = req.body;

    // Check if category exists
    const categoryResult = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const result = await pool.query(
      `UPDATE products 
       SET name = $1, category_id = $2, price = $3, description = $4, 
           image_url = $5, is_available = $6, is_favorite = $7 
       WHERE id = $8 
       RETURNING *`,
      [name, category_id, price, description, image_url, is_available, is_favorite, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product has reviews
    const reviewsResult = await pool.query('SELECT COUNT(*) FROM reviews WHERE product_id = $1', [id]);
    if (parseInt(reviewsResult.rows[0].count) > 0) {
      return res.status(400).json({ message: 'Cannot delete product with existing reviews' });
    }

    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get favorite products
router.get('/favorites/list', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.is_favorite = true AND p.is_available = true ORDER BY p.name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Get favorite products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const searchTerm = `%${query}%`;
    
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p 
       JOIN categories c ON p.category_id = c.id 
       WHERE (p.name ILIKE $1 OR p.description ILIKE $1) 
       AND p.is_available = true 
       ORDER BY p.name`,
      [searchTerm]
    );
    
    res.json(result.rows);
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 