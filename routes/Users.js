const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/UserController');

// User Registration Endpoint
router.post('/register', UserController.registerUser);

module.exports = router;
