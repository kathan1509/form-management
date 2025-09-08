const express = require('express');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

// Route for user registration
router.post('/register', AuthController.register);

// Route for user login
router.post('/login', AuthController.login);

module.exports = router;