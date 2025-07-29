const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  let connection;

  try {
    // First, connect without database to create it
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "mysql.1234567",
    });

    console.log("Connected to MySQL server");

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "leoncafe_db"}`
    );
    console.log(
      `Database '${
        process.env.DB_NAME || "leoncafe_db"
      }' created or already exists`
    );

    // Use the database
    await connection.query(`USE ${process.env.DB_NAME || "leoncafe_db"}`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) UNIQUE,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("Users table created");

    // Create categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("Categories table created");

    // Create products table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category_id VARCHAR(36) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        is_available BOOLEAN DEFAULT TRUE,
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      )
    `);
    console.log("Products table created");

    // Insert sample categories
    const categories = [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "قهوه",
        description: "انواع قهوه‌های داغ و سرد",
        image_url: "/menu-items/coffee.png",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "اسپرسو",
        description: "قهوه‌های اسپرسو و مشتقات آن",
        image_url: "/menu-items/espresso.png",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "کاپوچینو",
        description: "کاپوچینو و لاته‌های مختلف",
        image_url: "/menu-items/cappuccino.png",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        name: "نوشیدنی‌های سرد",
        description: "نوشیدنی‌های خنک و آبمیوه‌ها",
        image_url: "/menu-items/ice-cappuccino.png",
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        name: "کیک و شیرینی",
        description: "انواع کیک، شیرینی و دسر",
        image_url: "/menu-items/pastries.png",
      },
    ];

    for (const category of categories) {
      await connection.execute(
        "INSERT IGNORE INTO categories (id, name, description, image_url) VALUES (?, ?, ?, ?)",
        [category.id, category.name, category.description, category.image_url]
      );
    }
    console.log("Sample categories inserted");

    // Insert sample products
    const products = [
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        name: "اسپرسو کلاسیک",
        category_id: "550e8400-e29b-41d4-a716-446655440002",
        price: 25000,
        description: "اسپرسو خالص با طعم قوی و عالی",
        image_url: "/menu-items/espresso.png",
        is_available: true,
        is_favorite: true,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        name: "لاته وانیل",
        category_id: "550e8400-e29b-41d4-a716-446655440003",
        price: 35000,
        description: "لاته با طعم وانیل طبیعی",
        image_url: "/menu-items/latte.png",
        is_available: true,
        is_favorite: true,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440003",
        name: "کاپوچینو",
        category_id: "550e8400-e29b-41d4-a716-446655440003",
        price: 30000,
        description: "کاپوچینو کلاسیک با کف شیر",
        image_url: "/menu-items/cappuccino.png",
        is_available: true,
        is_favorite: false,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        name: "کولد برو",
        category_id: "550e8400-e29b-41d4-a716-446655440004",
        price: 40000,
        description: "قهوه سرد با طعم ملایم",
        image_url: "/menu-items/coffee.png",
        is_available: true,
        is_favorite: true,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440005",
        name: "آب پرتقال",
        category_id: "550e8400-e29b-41d4-a716-446655440004",
        price: 25000,
        description: "آب پرتقال تازه و طبیعی",
        image_url: "/menu-items/orange-juice.png",
        is_available: true,
        is_favorite: false,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        name: "کروسان شکلات",
        category_id: "550e8400-e29b-41d4-a716-446655440005",
        price: 20000,
        description: "کروسان با شکلات تلخ",
        image_url: "/menu-items/pastries.png",
        is_available: true,
        is_favorite: false,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440007",
        name: "آمریکانو",
        category_id: "550e8400-e29b-41d4-a716-446655440001",
        price: 28000,
        description: "قهوه آمریکانو با آب داغ",
        image_url: "/menu-items/coffee.png",
        is_available: true,
        is_favorite: false,
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440008",
        name: "موکا",
        category_id: "550e8400-e29b-41d4-a716-446655440003",
        price: 38000,
        description: "لاته با شکلات و کرم",
        image_url: "/menu-items/latte.png",
        is_available: true,
        is_favorite: false,
      },
    ];

    for (const product of products) {
      await connection.execute(
        "INSERT IGNORE INTO products (id, name, category_id, price, description, image_url, is_available, is_favorite) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          product.id,
          product.name,
          product.category_id,
          product.price,
          product.description,
          product.image_url,
          product.is_available,
          product.is_favorite,
        ]
      );
    }
    console.log("Sample products inserted");

    // Insert default admin user
    const bcrypt = require("bcryptjs");
    const adminPassword = await bcrypt.hash("admin123", 10);

    await connection.execute(
      "INSERT IGNORE INTO users (name, phone, password, is_admin) VALUES (?, ?, ?, ?)",
      ["مدیر سیستم", "09123456789", adminPassword, true]
    );
    console.log(
      "Default admin user created (phone: 09123456789, password: admin123)"
    );

    console.log("\n✅ Database setup completed successfully!");
    console.log("\n📋 Database Information:");
    console.log(`   Database: ${process.env.DB_NAME || "leoncafe_db"}`);
    console.log(`   Host: ${process.env.DB_HOST || "localhost"}`);
    console.log(`   Port: ${process.env.DB_PORT || 3306}`);
    console.log(`   User: ${process.env.DB_USER || "root"}`);
    console.log("\n🔑 Admin Login:");
    console.log("   Phone: 09123456789");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
