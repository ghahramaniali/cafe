# Image Upload Guide

This guide explains how to use the image upload functionality in the cafe application.

## Overview

The application uses a **hybrid storage approach**:

- Images are stored on the filesystem in the `uploads/` directory
- Image URLs are stored in the database
- Images are served as static files via Express

## Features

- ✅ Single and multiple image uploads
- ✅ Image validation (type, size)
- ✅ Unique filename generation
- ✅ Admin-only access
- ✅ Automatic file cleanup utilities
- ✅ Product creation with image upload

## API Endpoints

### 1. Upload Single Image

```
POST /api/upload/image
Content-Type: multipart/form-data
Authorization: Bearer <admin_token>

Form Data:
- image: File (required)
```

**Response:**

```json
{
  "message": "Image uploaded successfully",
  "filename": "image-1703123456789-123456789.jpg",
  "originalName": "coffee.jpg",
  "size": 1024000,
  "path": "uploads/image-1703123456789-123456789.jpg",
  "url": "/uploads/image-1703123456789-123456789.jpg"
}
```

### 2. Upload Multiple Images

```
POST /api/upload/images
Content-Type: multipart/form-data
Authorization: Bearer <admin_token>

Form Data:
- images: File[] (required, max 10 files)
```

### 3. Delete Image

```
DELETE /api/upload/image/:filename
Authorization: Bearer <admin_token>
```

### 4. Create Product with Image

```
POST /api/products/with-image
Content-Type: multipart/form-data
Authorization: Bearer <admin_token>

Form Data:
- name: String (required)
- category_id: UUID (required)
- price: Number (required)
- description: String (optional)
- is_available: Boolean (optional)
- is_favorite: Boolean (optional)
- image: File (optional)
```

## Usage Examples

### Frontend (JavaScript)

```javascript
// Upload single image
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/upload/image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};

// Create product with image
const createProductWithImage = async (productData, imageFile) => {
  const formData = new FormData();

  // Add product data
  Object.keys(productData).forEach((key) => {
    formData.append(key, productData[key]);
  });

  // Add image if provided
  if (imageFile) {
    formData.append("image", imageFile);
  }

  const response = await fetch("/api/products/with-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
```

### Frontend (React with TypeScript)

```typescript
import { useState } from "react";

interface ProductData {
  name: string;
  category_id: string;
  price: number;
  description?: string;
  is_available?: boolean;
  is_favorite?: boolean;
}

const ProductForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    category_id: "",
    price: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Add product data
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    // Add image if selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("/api/products/with-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product name"
        value={productData.name}
        onChange={(e) =>
          setProductData({ ...productData, name: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Price"
        value={productData.price}
        onChange={(e) =>
          setProductData({ ...productData, price: parseFloat(e.target.value) })
        }
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Create Product</button>
    </form>
  );
};
```

## Image Validation

The system validates images based on:

- **File Type**: Only JPEG, PNG, GIF, and WebP are allowed
- **File Size**: Maximum 5MB per file
- **File Count**: Maximum 10 files for multiple uploads

## File Storage

- **Location**: `backend/uploads/` directory
- **Naming**: `{prefix}-{timestamp}-{random}.{extension}`
- **Access**: Images are served at `/uploads/{filename}`

## Security Features

- ✅ Admin authentication required for uploads
- ✅ File type validation
- ✅ File size limits
- ✅ Unique filename generation
- ✅ Path traversal protection

## Utilities

### Image Utilities (`utils/imageUtils.js`)

```javascript
const {
  validateImage,
  deleteImage,
  cleanupOrphanedImages,
} = require("./utils/imageUtils");

// Validate image
const validation = validateImage(file);
if (!validation.valid) {
  console.error(validation.error);
}

// Delete image
const deleted = deleteImage("filename.jpg", uploadsDir);

// Clean up orphaned images
await cleanupOrphanedImages(pool, uploadsDir);
```

## Error Handling

Common error responses:

```json
{
  "message": "File too large. Maximum size is 5MB"
}
```

```json
{
  "message": "Only image files are allowed!"
}
```

```json
{
  "message": "No image file provided"
}
```

## Testing

Run the test script to verify functionality:

```bash
cd backend
node test-image-upload.js
```

## Best Practices

1. **Always validate files** on both frontend and backend
2. **Use appropriate file sizes** for web optimization
3. **Implement image compression** for better performance
4. **Regular cleanup** of orphaned images
5. **Backup uploads directory** regularly
6. **Monitor disk space** usage

## Future Enhancements

- [ ] Image compression and resizing
- [ ] Cloud storage integration (AWS S3, Google Cloud Storage)
- [ ] Image optimization (WebP conversion)
- [ ] Thumbnail generation
- [ ] CDN integration
- [ ] Image metadata extraction
