const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/UserController');

router.post('/register', UserController.registerUser);
router.get('/activate', UserController.activateUser);

module.exports = router;
