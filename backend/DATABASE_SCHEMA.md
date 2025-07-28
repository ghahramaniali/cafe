# Cafe Database Schema Documentation

## Database Overview

- **Database Name**: `cafe_db`
- **Engine**: MySQL
- **Character Set**: UTF-8
- **Collation**: utf8mb4_unicode_ci

## Tables Structure

### 1. `users` Table

**Purpose**: Store user accounts and authentication information

| Column       | Type         | Constraints                                           | Description                   |
| ------------ | ------------ | ----------------------------------------------------- | ----------------------------- |
| `id`         | INT          | AUTO_INCREMENT, PRIMARY KEY                           | Unique user identifier        |
| `name`       | VARCHAR(255) | NOT NULL                                              | User's full name              |
| `phone`      | VARCHAR(20)  | UNIQUE                                                | Phone number (used for login) |
| `password`   | VARCHAR(255) | NOT NULL                                              | Hashed password               |
| `is_admin`   | BOOLEAN      | DEFAULT FALSE                                         | Admin privileges flag         |
| `created_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Account creation date         |
| `updated_at` | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Last update timestamp         |

**Indexes**:

- Primary Key: `id`
- Unique Index: `phone`

**Sample Data**:

```sql
INSERT INTO users (name, phone, password, is_admin) VALUES
('مدیر سیستم', '09123456789', '$2a$10$...', true);
```

### 2. `categories` Table

**Purpose**: Store product categories

| Column        | Type         | Constraints                                           | Description          |
| ------------- | ------------ | ----------------------------------------------------- | -------------------- |
| `id`          | VARCHAR(36)  | PRIMARY KEY                                           | UUID for category    |
| `name`        | VARCHAR(255) | NOT NULL                                              | Category name        |
| `description` | TEXT         | NULL                                                  | Category description |
| `image_url`   | VARCHAR(500) | NULL                                                  | Category image path  |
| `created_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp   |
| `updated_at`  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Update timestamp     |

**Indexes**:

- Primary Key: `id`

**Sample Data**:

```sql
INSERT INTO categories (id, name, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'قهوه', 'انواع قهوه‌های داغ و سرد', '/menu-items/coffee.png'),
('550e8400-e29b-41d4-a716-446655440002', 'اسپرسو', 'قهوه‌های اسپرسو و مشتقات آن', '/menu-items/espresso.png'),
('550e8400-e29b-41d4-a716-446655440003', 'کاپوچینو', 'کاپوچینو و لاته‌های مختلف', '/menu-items/cappuccino.png'),
('550e8400-e29b-41d4-a716-446655440004', 'نوشیدنی‌های سرد', 'نوشیدنی‌های خنک و آبمیوه‌ها', '/menu-items/ice-cappuccino.png'),
('550e8400-e29b-41d4-a716-446655440005', 'کیک و شیرینی', 'انواع کیک، شیرینی و دسر', '/menu-items/pastries.png');
```

### 3. `products` Table

**Purpose**: Store product information

| Column         | Type          | Constraints                                           | Description                   |
| -------------- | ------------- | ----------------------------------------------------- | ----------------------------- |
| `id`           | VARCHAR(36)   | PRIMARY KEY                                           | UUID for product              |
| `name`         | VARCHAR(255)  | NOT NULL                                              | Product name                  |
| `category_id`  | VARCHAR(36)   | NOT NULL, FOREIGN KEY                                 | Reference to categories table |
| `price`        | DECIMAL(10,2) | NOT NULL                                              | Product price                 |
| `description`  | TEXT          | NULL                                                  | Product description           |
| `image_url`    | VARCHAR(500)  | NULL                                                  | Product image path            |
| `is_available` | BOOLEAN       | DEFAULT TRUE                                          | Availability status           |
| `is_favorite`  | BOOLEAN       | DEFAULT FALSE                                         | Featured product flag         |
| `created_at`   | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP                             | Creation timestamp            |
| `updated_at`   | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Update timestamp              |

**Indexes**:

- Primary Key: `id`
- Foreign Key: `category_id` → `categories(id)`

**Sample Data**:

```sql
INSERT INTO products (id, name, category_id, price, description, image_url, is_available, is_favorite) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'اسپرسو کلاسیک', '550e8400-e29b-41d4-a716-446655440002', 25000, 'اسپرسو خالص با طعم قوی و عالی', '/menu-items/espresso.png', true, true),
('660e8400-e29b-41d4-a716-446655440002', 'لاته وانیل', '550e8400-e29b-41d4-a716-446655440003', 35000, 'لاته با طعم وانیل طبیعی', '/menu-items/latte.png', true, true),
('660e8400-e29b-41d4-a716-446655440003', 'کاپوچینو', '550e8400-e29b-41d4-a716-446655440003', 30000, 'کاپوچینو کلاسیک با کف شیر', '/menu-items/cappuccino.png', true, false);
```

## Relationships

### Foreign Key Relationships

- `products.category_id` → `categories.id`
  - **Type**: Many-to-One
  - **Action**: CASCADE on DELETE
  - **Description**: Each product belongs to one category

## Data Flow

### User Authentication Flow

1. User registers with phone number and password
2. Password is hashed using bcrypt
3. User can login with phone/password combination
4. JWT token is generated for authenticated sessions

### Product Management Flow

1. Admin creates categories first
2. Products are added with category references
3. Products can be marked as favorites
4. Availability status controls product visibility

## Security Considerations

### Password Security

- Passwords are hashed using bcrypt with salt rounds of 10
- Never store plain text passwords

### Authentication

- JWT tokens are used for session management
- Tokens have expiration times
- Admin users have elevated privileges

### Data Validation

- Phone numbers are unique per user
- Product prices are stored as DECIMAL to avoid floating-point precision issues
- Foreign key constraints ensure data integrity

## Backup and Migration

### Creating Backup

```bash
# Export entire database
mysqldump -u username -p cafe_db > cafe_backup.sql

# Export schema only
mysqldump -u username -p --no-data cafe_db > cafe_schema.sql

# Export data only
mysqldump -u username -p --no-create-info cafe_db > cafe_data.sql
```

### Restoring Database

```bash
# Restore from backup
mysql -u username -p cafe_db < cafe_backup.sql
```

## Performance Considerations

### Indexes

- Primary keys are automatically indexed
- Phone number has unique index for fast login lookups
- Category ID is indexed for product queries

### Query Optimization

- Use prepared statements to prevent SQL injection
- Connection pooling is implemented for better performance
- Consider adding indexes for frequently queried columns

## Environment Variables

Required environment variables for database connection:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cafe_db
DB_USER=root
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
```

## Default Admin Account

- **Phone**: 09123456789
- **Password**: admin123
- **Role**: Admin

**⚠️ Important**: Change default admin password in production!
