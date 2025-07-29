const mysql = require("mysql2/promise");
require("dotenv").config();

async function testDatabaseConnection() {
  console.log("🔍 Testing database connection...");

  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || "leoncafe_db",
      user: process.env.DB_USER || "leoncafe_quf",
      password: process.env.DB_PASSWORD || "mysql.1234567",
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();
    console.log("✅ Database connection successful!");

    // Test query
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("✅ Database query test successful!");

    connection.release();
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    return false;
  }
}

function validateEnvironment() {
  console.log("🔍 Validating environment variables...");

  const requiredVars = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "PORT",
    "NODE_ENV",
    "JWT_SECRET",
    "CORS_ORIGIN",
  ];

  const missing = [];

  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error("❌ Missing environment variables:", missing.join(", "));
    return false;
  }

  console.log("✅ All required environment variables are set");
  return true;
}

function checkSecurity() {
  console.log("🔍 Checking security configuration...");

  const warnings = [];

  if (
    process.env.JWT_SECRET ===
    "your_super_secret_jwt_key_change_this_in_production"
  ) {
    warnings.push(
      "⚠️  JWT_SECRET is still using the default value. Change it in production!"
    );
  }

  if (process.env.NODE_ENV !== "production") {
    warnings.push("⚠️  NODE_ENV is not set to production");
  }

  if (process.env.CORS_ORIGIN !== "https://leoncafe.ir") {
    warnings.push("⚠️  CORS_ORIGIN is not set to https://leoncafe.ir");
  }

  if (warnings.length > 0) {
    console.log("Security warnings:");
    warnings.forEach((warning) => console.log(warning));
  } else {
    console.log("✅ Security configuration looks good");
  }

  return warnings.length === 0;
}

async function main() {
  console.log("🚀 cPanel Setup Validation");
  console.log("==========================\n");

  // Validate environment
  const envValid = validateEnvironment();
  if (!envValid) {
    console.log(
      "\n❌ Environment validation failed. Please check your .env file."
    );
    process.exit(1);
  }

  // Check security
  checkSecurity();

  // Test database connection
  const dbConnected = await testDatabaseConnection();
  if (!dbConnected) {
    console.log(
      "\n❌ Database connection failed. Please check your database credentials."
    );
    process.exit(1);
  }

  console.log("\n✅ Setup validation completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Upload your backend files to cPanel");
  console.log("2. Create Node.js app in cPanel");
  console.log("3. Set environment variables in cPanel");
  console.log("4. Install dependencies: npm install --production");
  console.log("5. Start the application");
  console.log("6. Test the API endpoints");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  testDatabaseConnection,
  validateEnvironment,
  checkSecurity,
};
