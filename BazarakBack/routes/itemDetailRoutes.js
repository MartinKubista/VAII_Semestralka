const express = require('express');
const router = express.Router();
const authMiddleware = require('./../authMiddleware.js');
const { itemDetail, addComment, showComments, updateComment, deleteComment } = require('../controllers/itemDetailController');


router.get('/:id', itemDetail);
router.get('/:id/comments', showComments);
router.post('/add-comment',authMiddleware, addComment);
router.put('/update-comment/:id',authMiddleware, updateComment);
router.delete('/delete-comment/:id',authMiddleware, deleteComment);
module.exports = router;