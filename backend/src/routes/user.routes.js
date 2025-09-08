const express = require('express');
const UserController = require('../controllers/user.controller');

const router = express.Router();
const userController = new UserController();

// Route to get user information by ID
router.get('/:id', userController.getUserById);

// Route to update user profile
router.put('/:id', userController.updateUserProfile);

// Route to get all users (admin only)
router.get('/', userController.getAllUsers);

module.exports = router;