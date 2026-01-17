const express = require('express');
const router = express.Router();
const { showProfile } = require('../controllers/profileController');


router.get('/:id', showProfile);
module.exports = router;