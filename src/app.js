import express from 'express';
import db from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

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
