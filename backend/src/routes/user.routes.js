import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// Mock UserService with basic functionality
const mockUserService = {
    findUserById: async (id) => {
        // Replace this with actual database logic
        return { id, username: 'testuser', role: 'student' };
    },
    findAllUsers: async () => {
        // Replace this with actual database logic
        return [
            { id: 1, username: 'user1', role: 'admin' },
            { id: 2, username: 'user2', role: 'teacher' },
        ];
    },
    updateUser: async (id, data) => {
        // Replace this with actual database logic
        return { id, ...data };
    },
    deleteUser: async (id) => {
        // Replace this with actual database logic
        return true;
    },
};

const userController = new UserController(mockUserService);

// Route to get user information by ID
router.get('/:id', (req, res) => userController.getUserById(req, res));

// Route to update user profile
router.put('/:id', (req, res) => userController.updateUser(req, res));

// Route to get all users (admin only)
router.get('/', (req, res) => userController.getAllUsers(req, res));

// Route to delete a user by ID
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

export default router;
