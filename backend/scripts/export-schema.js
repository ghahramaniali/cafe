const mysql = require("mysql2/promise");
require("dotenv").config();

async function exportSchema() {
  let connection;

  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || "leoncafe_db",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "mysql.1234567",
    });

    console.log("Connected to MySQL database");
    console.log("Exporting database schema...\n");

    // Get all tables
    const [tables] = await connection.execute("SHOW TABLES");

    let schemaSQL = `-- Cafe Database Schema
-- Generated on: ${new Date().toISOString()}
-- Database: ${process.env.DB_NAME || "leoncafe_db"}

`;

    for (const table of tables) {
      const tableName = Object.values(table)[0];
      console.log(`Exporting schema for table: ${tableName}`);

      // Get CREATE TABLE statement
      const [createTable] = await connection.execute(
        `SHOW CREATE TABLE ${tableName}`
      );
      const createStatement = createTable[0]["Create Table"];

      schemaSQL += `-- Table structure for table \`${tableName}\`
${createStatement};

`;

      // Get table data count
      const [countResult] = await connection.execute(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );
      const count = countResult[0].count;
      console.log(`  - ${count} records found`);
    }

    // Write to file
    const fs = require("fs");
    const filename = `cafe_schema_${
      new Date().toISOString().split("T")[0]
    }.sql`;
    fs.writeFileSync(filename, schemaSQL);

    console.log(`\n✅ Schema exported to: ${filename}`);
    console.log("\n📋 Database Tables:");

    for (const table of tables) {
      const tableName = Object.values(table)[0];
      const [countResult] = await connection.execute(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );
      console.log(`   - ${tableName}: ${countResult[0].count} records`);
    }
  } catch (error) {
    console.error("❌ Schema export failed:", error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

exportSchema();
