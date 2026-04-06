const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Health Check
router.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// User Routes
router.get('/users/:id', userController.getUserProfile);

module.exports = router;
