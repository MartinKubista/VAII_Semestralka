const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');

const {addReview, showReviews, updateReview, deleteReview } = require('../controllers/profileReviewController');


router.get('/:id/reviews', showReviews);
router.post('/add-review', authMiddleware,  addReview);
router.put('/update-review/:id',authMiddleware, updateReview);
router.delete('/delete-review/:id',authMiddleware, deleteReview);
module.exports = router;