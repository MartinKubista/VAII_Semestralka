const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { showItems, showUsers, showReviews, showComments} = require('../controllers/adminController');



router.get('/items',  showItems);
router.get('/users', showUsers);
router.get('/reviews', showReviews);
router.get('/comments', showComments);
module.exports = router;