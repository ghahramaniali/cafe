const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "leoncafe_db",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql.1234567",
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  // Remove deprecated options: acquireTimeout, timeout, reconnect
  // These are not valid for mysql2
});

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to MySQL database:", err);
    process.exit(-1);
  });

module.exports = pool;
