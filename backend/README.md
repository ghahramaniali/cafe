# Cafe Backend API

A Node.js/Express.js backend API for a cafe management system using MySQL database.

## Features

- **User Authentication**: JWT-based authentication with admin privileges
- **Product Management**: CRUD operations for products with image uploads
- **Category Management**: Organize products by categories
- **File Upload**: Image upload functionality for products and categories
- **Admin Dashboard**: Admin-only endpoints for managing the system

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v8.0 or higher)
- npm or yarn

## Installation

1. **Clone the repository and navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Update the `.env` file with your MySQL credentials:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=cafe_db
   DB_USER=root
   DB_PASSWORD=mysql.1234567
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Set up the database:**

   ```bash
   npm run setup
   ```

   This will:

   - Create the MySQL database
   - Create all necessary tables
   - Insert sample data (categories, products, admin user)

## Database Setup

The setup script will create the following tables:

### Users Table

- `id` (AUTO_INCREMENT PRIMARY KEY)
- `name` (VARCHAR)
- `phone` (VARCHAR, UNIQUE)
- `password` (VARCHAR - hashed)
- `is_admin` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Categories Table

- `id` (VARCHAR(36) PRIMARY KEY - UUID)
- `name` (VARCHAR)
- `description` (TEXT)
- `image_url` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Products Table

- `id` (VARCHAR(36) PRIMARY KEY - UUID)
- `name` (VARCHAR)
- `category_id` (VARCHAR(36) - Foreign Key)
- `price` (DECIMAL(10,2))
- `description` (TEXT)
- `image_url` (VARCHAR)
- `is_available` (BOOLEAN)
- `is_favorite` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Sample Data

The setup script includes sample data:

### Categories

- قهوه (Coffee)
- اسپرسو (Espresso)
- کاپوچینو (Cappuccino)
- نوشیدنی‌های سرد (Cold Drinks)
- کیک و شیرینی (Pastries)

### Products

- اسپرسو کلاسیک (Classic Espresso)
- لاته وانیل (Vanilla Latte)
- کاپوچینو (Cappuccino)
- کولد برو (Cold Brew)
- آب پرتقال (Orange Juice)
- کروسان شکلات (Chocolate Croissant)
- آمریکانو (Americano)
- موکا (Mocha)

### Default Admin User

- **Phone**: 09123456789
- **Password**: admin123
- **Role**: Admin

## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **For production:**
   ```bash
   npm start
   ```

The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `GET /api/products/favorites/list` - Get favorite products
- `GET /api/products/search/:query` - Search products

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create new category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)
- `GET /api/categories/:id/products` - Get products by category

### Users (Admin Only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `PATCH /api/users/:id/password` - Change user password
- `PATCH /api/users/:id/toggle-admin` - Toggle admin status
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

### File Upload

- `POST /api/upload/image` - Upload single image
- `POST /api/upload/images` - Upload multiple images
- `DELETE /api/upload/image/:filename` - Delete image

## File Structure

```
backend/
├── config/
│   └── database.js          # MySQL database configuration
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── routes/
│   ├── auth.js             # Authentication routes
│   ├── products.js         # Product management routes
│   ├── categories.js       # Category management routes
│   ├── users.js           # User management routes
│   └── upload.js          # File upload routes
├── scripts/
│   └── setup.js           # Database setup script
├── uploads/               # Uploaded files directory
├── server.js              # Main server file
├── package.json
└── README.md
```

## Error Handling

The API includes comprehensive error handling for:

- Database connection errors
- Authentication failures
- File upload errors
- Validation errors
- Authorization errors

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Admin role-based access control
- File upload validation
- SQL injection prevention with parameterized queries

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
