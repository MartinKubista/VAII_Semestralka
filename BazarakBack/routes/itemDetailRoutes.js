const express = require('express');
const router = express.Router();
const { itemDetail, addComment, showComments, updateComment, deleteComment } = require('../controllers/itemDetailController');


router.get('/:id', itemDetail);
router.get('/:id/comments', showComments);
router.post('/add-comment', addComment);
router.put('/update-comment/:id', updateComment);
router.delete('/delete-comment/:id', deleteComment);
module.exports = router;