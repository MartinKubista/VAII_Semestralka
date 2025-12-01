const express = require('express');
const router = express.Router();
const { itemDetail } = require('../controllers/itemDetailController');

router.get('/:id', itemDetail);

module.exports = router;