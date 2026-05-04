import BaseModel from './BaseModel.js';

class User extends BaseModel {
  static tableName = 'user information';

  constructor(id, name, age) {
    super();
    this.id = id;
    this.name = name;
    this.age = age;
  }

  static async findAll() {
    const rows = await super.findAll(this.tableName);
    return rows.map(({ id, name, age }) => new User(id, name, age));
  }

  static async findById(id) {
    const row = await super.findById(this.tableName, id);
    if (!row) return null;
    const { id: userId, name, age } = row;
    return new User(userId, name, age);
  }

  static async create({ name, age }) {
    const findIdSql = 'SELECT IFNULL(MAX(id), 0) + 1 AS nextId FROM `user information`';
    const [{ nextId }] = await this.query(findIdSql);
    const insertId = await super.create(this.tableName, { id: nextId, name, age });
    return new User(nextId, name, age);
  }

  static async update(id, { name, age }) {
    const updated = await super.update(this.tableName, id, { name, age });
    if (!updated) return null;
    return new User(id, name, age);
  }

  static async delete(id) {
    return await super.delete(this.tableName, id);
  }
}

export default User;