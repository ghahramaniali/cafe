const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'cafe_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
});

const bcrypt = require('bcryptjs');

async function setupDatabase() {
  try {
    console.log('Setting up database...');

    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Check if tables exist
    const tablesCheck = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('categories', 'users', 'products', 'reviews')
    `);

    if (tablesCheck.rows.length === 4) {
      console.log('✅ Database tables already exist');
    } else {
      console.log('❌ Database tables not found. Please run the schema.sql file first.');
      console.log('Run: psql -d cafe_db -f database/schema.sql');
      process.exit(1);
    }

    // Check if admin user exists
    const adminCheck = await pool.query(
      'SELECT id FROM users WHERE is_admin = true LIMIT 1'
    );

    if (adminCheck.rows.length === 0) {
      console.log('Creating admin user...');
      
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);

      await pool.query(`
        INSERT INTO users (username, email, password_hash, first_name, last_name, is_admin, is_active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, ['admin', 'admin@cafe.com', passwordHash, 'Admin', 'User', true, true]);

      console.log('✅ Admin user created');
      console.log('Email: admin@cafe.com');
      console.log('Password: admin123');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Display database stats
    const stats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM categories) as categories_count,
        (SELECT COUNT(*) FROM users) as users_count,
        (SELECT COUNT(*) FROM products) as products_count,
        (SELECT COUNT(*) FROM reviews) as reviews_count
    `);

    console.log('\n📊 Database Statistics:');
    console.log(`Categories: ${stats.rows[0].categories_count}`);
    console.log(`Users: ${stats.rows[0].users_count}`);
    console.log(`Products: ${stats.rows[0].products_count}`);
    console.log(`Reviews: ${stats.rows[0].reviews_count}`);

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Test the API: http://localhost:5000/health');
    console.log('3. Use admin credentials to access admin features');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase(); 