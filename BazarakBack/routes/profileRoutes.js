const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { showProfile, changePassword, changeProfileData, showProfileItems, deleteProfileItem} = require('../controllers/profileController');


router.get('/:id', showProfile);
router.get('/:id/items', showProfileItems);
router.delete('/:id/deleteItem', authMiddleware, deleteProfileItem);
router.put('/changePassword',authMiddleware, changePassword);
router.put('/changeProfileData',authMiddleware, changeProfileData);
module.exports = router;