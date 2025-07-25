# Cafe Backend API

Express.js backend with PostgreSQL for a cafe management system.

## Features

- **Authentication**: JWT-based authentication with user registration and login
- **Categories Management**: CRUD operations for product categories
- **Products Management**: Full product management with search and filtering
- **Reviews System**: User reviews with rating and approval system
- **User Management**: Admin user management capabilities
- **Bilingual Support**: Persian and English content support

## Database Schema

### Tables

1. **categories** - Product categories (دسته بندی ها)
2. **users** - User accounts (کاربران)
3. **products** - Products/Menu items (محصولات)
4. **reviews** - User reviews and ratings (نظرات)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository and navigate to backend directory:**

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

   Edit `.env` file with your database credentials:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=cafe_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Create PostgreSQL database:**

   ```sql
   CREATE DATABASE cafe_db;
   ```

5. **Run database schema:**

   ```bash
   psql -d cafe_db -f database/schema.sql
   ```

6. **Start the server:**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication (`/api/auth`)

- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user (authenticated)

### Categories (`/api/categories`)

- `GET /` - Get all categories
- `GET /:id` - Get category by ID
- `POST /` - Create new category (admin only)
- `PUT /:id` - Update category (admin only)
- `DELETE /:id` - Delete category (admin only)
- `GET /:id/products` - Get products by category

### Products (`/api/products`)

- `GET /` - Get all products (with filters)
- `GET /:id` - Get product by ID
- `POST /` - Create new product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)
- `GET /featured/list` - Get featured products
- `GET /search/:query` - Search products

### Reviews (`/api/reviews`)

- `GET /` - Get all reviews (with filters)
- `GET /:id` - Get review by ID
- `POST /` - Create new review (authenticated)
- `PUT /:id` - Update review (owner only)
- `DELETE /:id` - Delete review (owner/admin)
- `PATCH /:id/approve` - Approve/reject review (admin only)
- `GET /product/:product_id` - Get reviews for product
- `GET /user/me` - Get user's reviews
- `GET /product/:product_id/average` - Get product rating stats

### Users (`/api/users`)

- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID (admin only)
- `PUT /:id` - Update user (admin only)
- `PATCH /:id/password` - Change user password (admin only)
- `PATCH /:id/toggle-status` - Toggle user status (admin only)
- `DELETE /:id` - Delete user (admin only)
- `GET /stats/overview` - Get user statistics (admin only)
- `GET /:id/reviews` - Get user's reviews (admin only)

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Request/Response Examples

### Register User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1234567890"
}
```

### Create Product

```bash
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Espresso",
  "name_fa": "اسپرسو",
  "category_id": "uuid-here",
  "price": 3.50,
  "description": "Strong Italian coffee",
  "description_fa": "قهوه ایتالیایی قوی",
  "is_available": true,
  "is_featured": false
}
```

### Create Review

```bash
POST /api/reviews
Authorization: Bearer <user_token>
Content-Type: application/json

{
  "product_id": "uuid-here",
  "rating": 5,
  "comment": "Excellent coffee!",
  "comment_fa": "قهوه عالی!"
}
```

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email"
    }
  ]
}
```

## Development

### Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (not implemented yet)

### Environment Variables

- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_NAME` - Database name
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `PORT` - Server port
- `JWT_SECRET` - JWT signing secret
- `CORS_ORIGIN` - Allowed CORS origin
- `NODE_ENV` - Environment (development/production)

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation with express-validator
- CORS configuration
- SQL injection prevention with parameterized queries
- Role-based access control (admin/user)

## Database Features

- UUID primary keys
- Automatic timestamp updates
- Foreign key constraints
- Indexes for performance
- Soft delete support (is_active flags)
- Bilingual content support (Persian/English)
