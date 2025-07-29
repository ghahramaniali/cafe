const mysql = require("mysql2/promise");
require("dotenv").config();

async function showTables() {
  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "mysql.1234567",
      database: process.env.DB_NAME || "leoncafe_db",
    });

    console.log("📊 Database Tables Overview\n");

    // Show all tables
    const [tables] = await connection.execute("SHOW TABLES");
    console.log("📋 Available Tables:");
    tables.forEach((table, index) => {
      console.log(`   ${index + 1}. ${Object.values(table)[0]}`);
    });
    console.log("");

    // Show table structures
    for (const table of tables) {
      const tableName = Object.values(table)[0];
      console.log(`\n🔍 Table: ${tableName}`);
      console.log("─".repeat(50));

      // Show table structure
      const [structure] = await connection.execute(`DESCRIBE ${tableName}`);
      console.log("📐 Structure:");
      structure.forEach((field) => {
        console.log(
          `   ${field.Field} | ${field.Type} | ${field.Null} | ${field.Key} | ${field.Default}`
        );
      });

      // Show table data count
      const [countResult] = await connection.execute(
        `SELECT COUNT(*) as count FROM ${tableName}`
      );
      const count = countResult[0].count;
      console.log(`\n📈 Records: ${count}`);

      // Show sample data (first 3 records)
      if (count > 0) {
        const [data] = await connection.execute(
          `SELECT * FROM ${tableName} LIMIT 3`
        );
        console.log("📝 Sample Data:");
        data.forEach((record, index) => {
          console.log(
            `   Record ${index + 1}:`,
            JSON.stringify(record, null, 2)
          );
        });
      }
      console.log("");
    }

    // Show relationships
    console.log("🔗 Table Relationships:");
    console.log("   users ← (no foreign keys)");
    console.log("   categories ← (no foreign keys)");
    console.log("   products → categories (category_id)");
    console.log("");

    console.log("✅ Database inspection completed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

showTables();
