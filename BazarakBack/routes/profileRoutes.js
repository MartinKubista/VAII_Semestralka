const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { showProfile, changePassword } = require('../controllers/profileController');


router.get('/:id', showProfile);
router.post('/changePassword',authMiddleware, changePassword);
module.exports = router;