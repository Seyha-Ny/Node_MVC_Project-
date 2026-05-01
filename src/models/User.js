import db from '../db.js';

class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static async getAll() {
    const sql = 'SELECT * FROM `user information` ORDER BY id ASC';
    const [rows] = await db.promise().query(sql);
    return rows.map(({ id, name }) => new User(id, name));
  }

  static async getById(id) {
    const sql = 'SELECT * FROM `user information` WHERE id = ?';
    const [rows] = await db.promise().query(sql, [id]);
    if (rows.length === 0) return null;
    const { id: userId, name } = rows[0];
    return new User(userId, name);
  }

  static async create({ name }) {
    const findIdSql = 'SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM `user information`';
    const [[{ nextId }]] = await db.promise().query(findIdSql);
    const insertSql = 'INSERT INTO `user information` (id, name) VALUES (?, ?)';
    await db.promise().query(insertSql, [nextId, name]);
    return new User(nextId, name);
  }

  // Placeholder for update and delete
  static async update(id, { name }) {
    const sql = 'UPDATE `user information` SET name = ? WHERE id = ?';
    const [result] = await db.promise().query(sql, [name, id]);
    if (result.affectedRows === 0) return null;
    return new User(id, name);
  }

  static async delete(id) {
    const sql = 'DELETE FROM `user information` WHERE id = ?';
    const [result] = await db.promise().query(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default User;