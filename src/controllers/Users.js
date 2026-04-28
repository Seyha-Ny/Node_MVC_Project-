const db = require('../db');

// Get all users
exports.getAllUsers = (req, res) => {
  const sql = 'SELECT * FROM `user information` ORDER BY id ASC';

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.send(result);
  });
};

// Get user by ID
exports.getUserById = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM `user information` WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.send(result[0]);
  });
};

// Create user
exports.createUser = (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const findIdSql = 'SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM `user information`';

  db.query(findIdSql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    const id = result[0].nextId;
    const insertSql = 'INSERT INTO `user information` (id, name) VALUES (?, ?)';

    db.query(insertSql, [id, name], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });

      res.status(201).json({ id, name });
    });
  });
};

// Update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const sql = 'UPDATE `user information` SET name = ? WHERE id = ?';

  db.query(sql, [name, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ id: Number(id), name });
  });
};

// Delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM `user information` WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  });
};