const express = require("express");
const { addImgs } = require('../controllers/imgController');
const authMiddleware = require('./../authMiddleware.js');
const upload = require("./../multer");

const router = express.Router();

router.post("/add-imgs",authMiddleware,  upload.array("images", 10), addImgs);

module.exports = router;