import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
const userController = new UserController();

// Routes
router.get('/users', userController.getUsers.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.post('/users', userController.create.bind(userController));
router.put('/users/:id', userController.updateUser.bind(userController));
router.delete('/users/:id', userController.deleteUser.bind(userController));

export default router;
