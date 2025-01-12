const mysql = require("mysql2/promise");

const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root@ashok",
  // database: "mysql backend demo",
});

module.exports = mySqlPool;
