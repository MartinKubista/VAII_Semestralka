const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { showItems, showUsers, showReviews, showComments, deleteUsers, deleteItems, deleteReviews, deleteComments} = require('../controllers/adminController');



router.get('/items',  showItems);
router.get('/users', showUsers);
router.get('/reviews', showReviews);
router.get('/comments', showComments);

router.delete('/users/:id', deleteUsers);
router.delete('/items/:id', deleteItems);
router.delete('/reviews/:id', deleteReviews);
router.delete('/comments/:id', deleteComments);
module.exports = router;