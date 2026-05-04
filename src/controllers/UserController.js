import BaseController from './BaseController.js';
import User from '../models/User.js';

export default class UserController extends BaseController {
  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      this.constructor.success(res, users, 'Users fetched successfully');
    } catch (error) {
      this.constructor.error(res, error.message);
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return this.constructor.notFound(res, 'User not found');
      }

      this.constructor.success(res, user, 'User fetched successfully');
    } catch (error) {
      this.constructor.error(res, error.message);
    }
  }

  async create(req, res) {
    try {
      const { name, age } = req.body;

      if (!name || age === undefined) {
        return this.constructor.badRequest(res, 'Name and age are required');
      }

      if (age < 0 || age > 150) {
        return this.constructor.badRequest(res, 'Age must be between 0 and 150');
      }

      const user = await User.create({ name, age });

      this.constructor.success(res, user, 'User created successfully', 201);
    } catch (error) {
      this.constructor.error(res, error.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age } = req.body;

      if (name === undefined && age === undefined) {
        return this.constructor.badRequest(res, 'At least one field (name or age) is required for update');
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return this.constructor.notFound(res, 'User not found');
      }

      const updateData = {
        name: name !== undefined ? name : existingUser.name,
        age: age !== undefined ? age : existingUser.age
      };

      const updatedUser = await User.update(id, updateData);

      this.constructor.success(res, updatedUser, 'User updated successfully');
    } catch (error) {
      this.constructor.error(res, error.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return this.constructor.notFound(res, 'User not found');
      }

      const deleted = await User.delete(id);

      if (deleted) {
        this.constructor.success(res, null, 'User deleted successfully');
      } else {
        this.constructor.notFound(res, 'User not found');
      }
    } catch (error) {
      this.constructor.error(res, error.message);
    }
  }
}
