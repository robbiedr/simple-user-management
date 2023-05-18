const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/UserController');
const {authenticateToken} = require('../utils/auth');

router.post('/register', UserController.registerUser);
router.get('/activate', UserController.activateUser);
router.post('/login', UserController.loginUser);
router.put('/change-password', authenticateToken, UserController.changePassword);

module.exports = router;
