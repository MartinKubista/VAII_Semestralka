const express = require('express');
const router = express.Router();
const {addReview, showReviews, updateReview, deleteReview } = require('../controllers/profileReviewController');


router.get('/:id/reviews', showReviews);
router.post('/add-review', addReview);
router.put('/update-review/:id', updateReview);
router.delete('/delete-review/:id', deleteReview);
module.exports = router;