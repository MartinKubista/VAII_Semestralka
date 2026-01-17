const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { showProfile, changePassword, changeProfileData } = require('../controllers/profileController');


router.get('/:id', showProfile);
router.post('/changePassword',authMiddleware, changePassword);
router.post('/changeProfileData',authMiddleware, changeProfileData);
module.exports = router;