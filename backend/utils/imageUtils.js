const fs = require('fs');
const path = require('path');

/**
 * Validate image file
 * @param {Object} file - Multer file object
 * @returns {Object} - Validation result
 */
const validateImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'File too large. Maximum size is 5MB' };
  }

  return { valid: true };
};

/**
 * Generate unique filename
 * @param {string} originalName - Original filename
 * @param {string} prefix - Prefix for the filename
 * @returns {string} - Unique filename
 */
const generateUniqueFilename = (originalName, prefix = 'file') => {
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1E9);
  const ext = path.extname(originalName);
  return `${prefix}-${timestamp}-${random}${ext}`;
};

/**
 * Delete image file
 * @param {string} filename - Filename to delete
 * @param {string} uploadsDir - Uploads directory path
 * @returns {boolean} - Success status
 */
const deleteImage = (filename, uploadsDir) => {
  try {
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

/**
 * Get image info
 * @param {string} filename - Filename
 * @param {string} uploadsDir - Uploads directory path
 * @returns {Object|null} - Image info or null if not found
 */
const getImageInfo = (filename, uploadsDir) => {
  try {
    const filePath = path.join(uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      return {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting image info:', error);
    return null;
  }
};

/**
 * Clean up orphaned images (images not referenced in database)
 * @param {Object} pool - Database pool
 * @param {string} uploadsDir - Uploads directory path
 */
const cleanupOrphanedImages = async (pool, uploadsDir) => {
  try {
    // Get all image URLs from database
    const result = await pool.query('SELECT image_url FROM products WHERE image_url IS NOT NULL');
    const dbImages = result.rows.map(row => {
      const url = row.image_url;
      return url ? path.basename(url) : null;
    }).filter(Boolean);

    // Get all files in uploads directory
    const files = fs.readdirSync(uploadsDir);
    
    // Find orphaned files
    const orphanedFiles = files.filter(file => !dbImages.includes(file));
    
    // Delete orphaned files
    orphanedFiles.forEach(file => {
      const filePath = path.join(uploadsDir, file);
      fs.unlinkSync(filePath);
      console.log(`Deleted orphaned file: ${file}`);
    });

    console.log(`Cleaned up ${orphanedFiles.length} orphaned images`);
  } catch (error) {
    console.error('Error cleaning up orphaned images:', error);
  }
};

module.exports = {
  validateImage,
  generateUniqueFilename,
  deleteImage,
  getImageInfo,
  cleanupOrphanedImages
}; 