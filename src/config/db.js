import mysql from 'mysql2';

// MySQL connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'users'
});

// Export the connection with promise wrapper
export default db;
