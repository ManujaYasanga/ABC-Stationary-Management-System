const express = require('express');
const router = express.Router();
const { register, login, getUserData } = require('../controllers/user.controller');

// Define a POST route for user registration
router.post('/register', register);
router.post('/login', login);
router.get('/get-data', getUserData);

module.exports = router;


