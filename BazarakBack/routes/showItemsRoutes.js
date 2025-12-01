const express = require('express');
const router = express.Router();
const { showItems } = require('../controllers/showItemsController');

router.get('/showItems', showItems);

module.exports = router;