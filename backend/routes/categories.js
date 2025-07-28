const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/database');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to only allow images
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

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [result] = await pool.execute('SELECT * FROM categories ORDER BY name');
    res.json(result);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(result[0]);
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create new category (Admin only)
router.post('/', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, image_url } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO categories (id, name, description, image_url, created_at, updated_at) VALUES (UUID(), ?, ?, ?, NOW(), NOW())',
      [name, description, image_url]
    );

    // Get the inserted category
    const [insertedCategory] = await pool.execute(
      'SELECT * FROM categories WHERE id = LAST_INSERT_ID()'
    );

    res.status(201).json(insertedCategory[0]);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category (Admin only)
router.put('/:id', adminAuth, [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description, image_url } = req.body;

    const [result] = await pool.execute(
      'UPDATE categories SET name = ?, description = ?, image_url = ?, updated_at = NOW() WHERE id = ?',
      [name, description, image_url, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Get the updated category
    const [updatedCategory] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(updatedCategory[0]);
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete category (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has products
    const [productsResult] = await pool.execute('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    if (parseInt(productsResult[0].count) > 0) {
      return res.status(400).json({ message: 'Cannot delete category with existing products' });
    }

    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get products by category
router.get('/:id/products', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(
      'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE p.category_id = ? AND p.is_available = true ORDER BY p.name',
      [id]
    );
    
    res.json(result);
  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category with image (Admin only)
router.post('/with-image', adminAuth, upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }
    
    const [result] = await pool.execute(
      'INSERT INTO categories (id, name, description, image_url, created_at, updated_at) VALUES (UUID(), ?, ?, ?, NOW(), NOW())',
      [name, description, image_url]
    );

    // Get the inserted category
    const [insertedCategory] = await pool.execute(
      'SELECT * FROM categories WHERE id = LAST_INSERT_ID()'
    );

    res.status(201).json(insertedCategory[0]);
  } catch (error) {
    console.error('Create category with image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update category with image (Admin only)
router.put('/:id/with-image', adminAuth, upload.single('image'), [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').optional()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    // Get current category to check if it has an image
    const [currentCategory] = await pool.execute('SELECT image_url FROM categories WHERE id = ?', [id]);
    if (currentCategory.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    let image_url = currentCategory[0].image_url;

    // If a new image is uploaded, update the image_url
    if (req.file) {
      // Delete old image if it exists
      if (currentCategory[0].image_url) {
        const oldImagePath = path.join(__dirname, '..', currentCategory[0].image_url);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image_url = `/uploads/${req.file.filename}`;
    }

    const [result] = await pool.execute(
      'UPDATE categories SET name = ?, description = ?, image_url = ?, updated_at = NOW() WHERE id = ?',
      [name, description, image_url, id]
    );

    // Get the updated category
    const [updatedCategory] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    res.json(updatedCategory[0]);
  } catch (error) {
    console.error('Update category with image error:', error);
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