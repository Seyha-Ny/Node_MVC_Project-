const express = require('express');
const app = express();

const db = require('./db');
const userRoutes = require('./routes/routeUsers');

app.use(express.json());

// Use routes
app.use('/', userRoutes);

// Start server after DB connection is ready
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.message);
    return;
  }

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});
