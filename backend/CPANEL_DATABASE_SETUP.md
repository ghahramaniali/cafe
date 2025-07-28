# cPanel Database Setup Guide

## Step-by-Step Instructions

### Step 1: Create Database in cPanel

1. **Login to cPanel**

   - Go to your hosting provider's cPanel login
   - Enter your username and password

2. **Find MySQL Databases**

   - Look for "MySQL Databases" or "Databases" section
   - Click on it

3. **Create New Database**
   - In "Create New Database" section:
   - Database Name: `cafe_db` (or your preferred name)
   - Click "Create Database"
   - **Note down the full database name** (e.g., `cpses_leeaphrlsj_cafe_db`)

### Step 2: Create Database User

1. **In the same MySQL Databases section:**
   - Scroll down to "Add New User"
   - Username: `cafe_user` (or your preferred name)
   - Password: Create a strong password
   - Click "Create User"
   - **Note down the full username** (e.g., `cpses_leeaphrlsj_cafe_user`)

### Step 3: Assign User to Database

1. **In "Add User To Database" section:**

   - Select your database from dropdown
   - Select your user from dropdown
   - Click "Add"

2. **Set Privileges:**
   - Check "ALL PRIVILEGES"
   - Click "Make Changes"

### Step 4: Import Schema

1. **Go to phpMyAdmin**

   - In cPanel, find "phpMyAdmin"
   - Click to open it

2. **Select Your Database**

   - Click on your database name in the left sidebar

3. **Import Schema**
   - Click "Import" tab
   - Click "Choose File"
   - Select `cafe_cpanel_schema.sql`
   - Click "Go"

### Step 5: Update Environment Variables

Update your backend `.env` file with the cPanel database credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_full_database_name
DB_USER=your_full_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

**Example:**

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=cpses_leeaphrlsj_cafe_db
DB_USER=cpses_leeaphrlsj_cafe_user
DB_PASSWORD=your_strong_password
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

## Troubleshooting

### Common Issues:

1. **"Access denied" error:**

   - Make sure you created the database first
   - Verify the database name and user permissions
   - Check that user has "ALL PRIVILEGES"

2. **"Database doesn't exist" error:**

   - Create the database in cPanel first
   - Use the full database name (with prefix)

3. **"User doesn't exist" error:**

   - Create the database user in cPanel first
   - Use the full username (with prefix)

4. **Import fails:**
   - Make sure you're importing into the correct database
   - Check file size limits
   - Try importing in smaller chunks if needed

## Verification

After setup, verify your database:

1. **Check Tables:**

   ```sql
   SHOW TABLES;
   ```

2. **Check Sample Data:**

   ```sql
   SELECT * FROM categories;
   SELECT * FROM products;
   SELECT * FROM users;
   ```

3. **Test Admin Login:**
   - Phone: `09123456789`
   - Password: `admin123`

## Security Notes

- ✅ Change default admin password
- ✅ Use strong database passwords
- ✅ Keep JWT_SECRET secure
- ✅ Use HTTPS in production
- ✅ Regularly backup your database

## Files You Need

1. **`cafe_cpanel_schema.sql`** - Database schema file
2. **Updated `.env`** - With cPanel database credentials
3. **Backend files** - Upload to your hosting

## Next Steps

After database setup:

1. Upload backend files to hosting
2. Configure Node.js in cPanel
3. Upload frontend files
4. Test the application
5. Configure domain and SSL
