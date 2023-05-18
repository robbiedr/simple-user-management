const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.registerUser);
router.get('/activate', UserController.activateUser);
router.post('/login', UserController.loginUser);

module.exports = router;
