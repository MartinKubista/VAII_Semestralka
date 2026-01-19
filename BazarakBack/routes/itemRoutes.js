const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { addItem } = require('../controllers/itemController');

router.post('/add-item', authMiddleware, addItem);

module.exports = router;