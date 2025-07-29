# cPanel Deployment Guide for Leon Cafe Project

This guide will walk you through deploying your Leon Cafe project (Next.js frontend + Express.js backend) to cPanel with your specific configuration.

## Your Configuration Details

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=leoncafe_db
DB_USER=leoncafe_quf
DB_PASSWORD=mysql.1234567

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS Configuration
CORS_ORIGIN=https://leoncafe.ir
```

## Prerequisites

- cPanel hosting account with Node.js support
- MySQL database access
- Domain: leoncafe.ir
- FTP/SFTP access or cPanel File Manager

## Step 1: Database Setup in cPanel

### 1.1 Create Database

1. Log into your cPanel account
2. Navigate to **MySQL Databases**
3. Create a new database:
   - Database name: `leoncafe_db`
   - Note: cPanel will prefix it with your username (e.g., `yourusername_leoncafe_db`)

### 1.2 Create Database User

1. In the same MySQL Databases section
2. Create a new user:
   - Username: `leoncafe_quf`
   - Password: `mysql.1234567`
   - Note: cPanel will prefix it with your username (e.g., `yourusername_leoncafe_quf`)

### 1.3 Add User to Database

1. Add the user to the database with **ALL PRIVILEGES**
2. Note down the full database name and username for environment variables

### 1.4 Import Database Schema

1. Go to **phpMyAdmin** in cPanel
2. Select your database (`yourusername_leoncafe_db`)
3. Click **Import**
4. Upload the `cafe_complete_schema.sql` file from your backend folder
5. Click **Go** to import the schema

## Step 2: Prepare and Upload Backend Files

### 2.1 Prepare Backend for Upload

```bash
# Navigate to backend directory
cd backend

# Install dependencies locally to create package-lock.json
npm install

# Create production environment file
cp .env.example .env
```

### 2.2 Create Production Environment File

Create a `.env` file in your backend directory with your production settings:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yourusername_leoncafe_db
DB_USER=yourusername_leoncafe_quf
DB_PASSWORD=mysql.1234567

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (CHANGE THIS TO A STRONG SECRET)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# CORS Configuration
CORS_ORIGIN=https://leoncafe.ir
```

**Important**: Replace `yourusername_` with your actual cPanel username prefix.

### 2.3 Upload Backend Files

1. Access cPanel File Manager or use FTP/SFTP
2. Navigate to your domain's root directory (`public_html`)
3. Create a folder called `api`
4. Upload all backend files to this folder:
   - `server.js`
   - `package.json`
   - `package-lock.json`
   - `.env` (with production settings)
   - All folders: `routes/`, `middleware/`, `config/`, `utils/`, `scripts/`

## Step 3: Configure Node.js App in cPanel

### 3.1 Create Node.js Application

1. In cPanel, navigate to **Setup Node.js App**
2. Click **Create Application**
3. Configure the application:
   - **Node.js version**: Select the latest LTS version (18.x or 20.x)
   - **Application mode**: Production
   - **Application root**: `/home/yourusername/public_html/api`
   - **Application URL**: `https://leoncafe.ir/api`
   - **Application startup file**: `server.js`
   - **Node.js environment**: Production

### 3.2 Configure Environment Variables

In the Node.js app settings, add these environment variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yourusername_leoncafe_db
DB_USER=yourusername_leoncafe_quf
DB_PASSWORD=mysql.1234567
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=https://leoncafe.ir
```

**Important**:

- Replace `yourusername_` with your actual cPanel username prefix
- Change the JWT_SECRET to a strong, unique secret key

## Step 4: Install Dependencies and Start Backend

### 4.1 Install Backend Dependencies

1. In cPanel Terminal or SSH:

```bash
cd /home/yourusername/public_html/api
npm install --production
```

### 4.2 Start the Node.js Application

1. In cPanel Node.js App manager
2. Click **Restart** on your application
3. Check the logs to ensure it started successfully

## Step 5: Test Backend API

### 5.1 Test Health Endpoint

Visit: `https://leoncafe.ir/api/health`
Should return: `{"status":"OK","timestamp":"...","environment":"production"}`

### 5.2 Test Database Connection

Visit: `https://leoncafe.ir/api/categories`
Should return your categories data if database is connected properly.

## Step 6: Frontend Configuration

### 6.1 Update Frontend API URL

In your frontend code, update the API base URL to point to your backend:

```typescript
// In src/utils/api.ts
const API_BASE_URL = "https://leoncafe.ir/api";
```

### 6.2 Build and Upload Frontend

```bash
# Build the Next.js application
npm run build

# Upload the built files to public_html
```

## Step 7: SSL and Security

### 7.1 Enable SSL Certificate

1. In cPanel, go to **SSL/TLS**
2. Install SSL certificate for `leoncafe.ir`
3. Force HTTPS redirect

### 7.2 Security Headers

Create an `.htaccess` file in your root directory:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## Step 8: Troubleshooting

### Common Issues and Solutions:

1. **500 Internal Server Error**

   - Check Node.js app logs in cPanel
   - Verify environment variables are set correctly
   - Ensure database connection is working

2. **Database Connection Issues**

   - Verify database credentials with correct cPanel username prefix
   - Check if database and user exist in phpMyAdmin
   - Ensure user has proper permissions

3. **CORS Errors**

   - Verify CORS_ORIGIN is set to `https://leoncafe.ir`
   - Check if frontend URL matches the CORS configuration

4. **Port Issues**
   - cPanel Node.js apps typically run on port 5000
   - Ensure PORT=5000 in environment variables

### Useful cPanel Tools:

- **Error Logs**: Check for detailed error messages
- **Terminal**: Run commands directly on server
- **File Manager**: Edit files directly in browser
- **Node.js App Manager**: Monitor and restart your application

## Step 9: Final Verification

### 9.1 Test Complete Flow

1. Visit `https://leoncafe.ir` - Frontend should load
2. Test API calls from frontend to backend
3. Test admin login functionality
4. Test product/category management

### 9.2 Monitor Application

1. Check Node.js app logs regularly
2. Monitor database performance
3. Set up error notifications if possible

## Security Checklist

- [ ] Changed JWT_SECRET to a strong, unique key
- [ ] Database user has minimal required privileges
- [ ] SSL certificate is installed and working
- [ ] CORS is properly configured
- [ ] Environment variables are secure
- [ ] File uploads are properly validated
- [ ] Error messages don't expose sensitive information

## Maintenance

1. **Regular Backups**: Set up automated database backups
2. **Updates**: Keep Node.js and npm packages updated
3. **Monitoring**: Check application logs regularly
4. **Security**: Regularly update JWT secrets and passwords

---

**Note**: Replace `yourusername_` with your actual cPanel username prefix throughout this guide. The exact prefix depends on your hosting provider's naming convention.
