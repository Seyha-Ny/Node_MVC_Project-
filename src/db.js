const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'users'
});

module.exports = db;
