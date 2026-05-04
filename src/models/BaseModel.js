import db from '../config/db.js';

class BaseModel {
  static db = db;

  static async query(sql, params = []) {
    try {
      const [rows] = await this.db.promise().query(sql, params);
      return rows;
    } catch (error) {
      throw new Error(`Database query error: ${error.message}`);
    }
  }

  static async findAll(tableName) {
    const sql = `SELECT * FROM \`${tableName}\` ORDER BY id ASC`;
    const rows = await this.query(sql);
    return rows;
  }

  static async findById(tableName, id) {
    const sql = `SELECT * FROM \`${tableName}\` WHERE id = ?`;
    const rows = await this.query(sql, [id]);
    return rows.length > 0 ? rows[0] : null;
  }

  static async create(tableName, data) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = `INSERT INTO \`${tableName}\` (${columns}) VALUES (${placeholders})`;
    const result = await this.query(sql, values);
    return result.insertId;
  }

  static async update(tableName, id, data) {
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];

    const sql = `UPDATE \`${tableName}\` SET ${setClause} WHERE id = ?`;
    const result = await this.query(sql, values);
    return result.affectedRows > 0;
  }

  static async delete(tableName, id) {
    const sql = `DELETE FROM \`${tableName}\` WHERE id = ?`;
    const result = await this.query(sql, [id]);
    return result.affectedRows > 0;
  }
}

export default BaseModel;