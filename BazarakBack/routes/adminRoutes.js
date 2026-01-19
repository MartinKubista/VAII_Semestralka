const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const adminMiddleware = require('./../adminMiddleware.js');
const { showItems, showUsers, showReviews, showComments, deleteUsers, deleteItems, deleteReviews, deleteComments} = require('../controllers/adminController');



router.get('/items', authMiddleware, adminMiddleware,  showItems);
router.get('/users', authMiddleware, adminMiddleware, showUsers);
router.get('/reviews', authMiddleware, adminMiddleware, showReviews);
router.get('/comments', authMiddleware, adminMiddleware, showComments);

router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUsers);
router.delete('/items/:id', authMiddleware, adminMiddleware, deleteItems);
router.delete('/reviews/:id', authMiddleware, adminMiddleware, deleteReviews);
router.delete('/comments/:id', authMiddleware, adminMiddleware, deleteComments);
module.exports = router;