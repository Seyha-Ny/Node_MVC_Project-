const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'users'
});

// Connect function
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;