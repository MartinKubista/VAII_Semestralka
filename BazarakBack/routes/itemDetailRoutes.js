const express = require('express');
const router = express.Router();
const { itemDetail } = require('../controllers/itemDetailController');
const { addComment } = require('../controllers/itemDetailController');
const { showComments } = require('../controllers/itemDetailController');


router.get('/:id', itemDetail);
router.get('/:id/comments', showComments);
router.post('/:id/add-comment', addComment);
module.exports = router;