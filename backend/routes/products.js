const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/database');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for product image uploads
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

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

// Create new product (Admin only) - JSON only
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
      `INSERT INTO products (name, category_id, price, description, image_url, is_available, is_favorite, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
       RETURNING *`,
      [name, category_id, price, description, image_url, is_available, is_favorite]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product with image upload (Admin only)
router.post('/with-image', adminAuth, upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('category_id').isUUID().withMessage('Valid category ID is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('description').optional(),
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
      is_available = true, 
      is_favorite = false 
    } = req.body;

    // Check if category exists
    const categoryResult = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const result = await pool.query(
      `INSERT INTO products (name, category_id, price, description, image_url, is_available, is_favorite, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
       RETURNING *`,
      [name, category_id, price, description, imageUrl, is_available, is_favorite]
    );

    res.status(201).json({
      ...result.rows[0],
      uploadedImage: req.file ? {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      } : null
    });
  } catch (error) {
    console.error('Create product with image error:', error);
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
           image_url = $5, is_available = $6, is_favorite = $7, updated_at = NOW() 
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

// Update product with image upload (Admin only)
router.put('/:id/with-image', adminAuth, upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('category_id').isUUID().withMessage('Valid category ID is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('description').optional(),
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
      is_available, 
      is_favorite 
    } = req.body;

    // Check if category exists
    const categoryResult = await pool.query('SELECT id FROM categories WHERE id = $1', [category_id]);
    if (categoryResult.rows.length === 0) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Check if product exists
    const existingProduct = await pool.query('SELECT image_url FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle image upload
    let imageUrl = existingProduct.rows[0].image_url; // Keep existing image if no new one uploaded
    if (req.file) {
      // Delete old image file if it exists
      if (existingProduct.rows[0].image_url) {
        const oldImagePath = path.join(__dirname, '..', existingProduct.rows[0].image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, category_id = $2, price = $3, description = $4, 
           image_url = $5, is_available = $6, is_favorite = $7, updated_at = NOW() 
       WHERE id = $8 
       RETURNING *`,
      [name, category_id, price, description, imageUrl, is_available, is_favorite, id]
    );

    res.json({
      ...result.rows[0],
      uploadedImage: req.file ? {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      } : null
    });
  } catch (error) {
    console.error('Update product with image error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

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

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB' });
    }
    return res.status(400).json({ message: error.message });
  }
  
  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ message: error.message });
  }
  
  next(error);
});

module.exports = router; 