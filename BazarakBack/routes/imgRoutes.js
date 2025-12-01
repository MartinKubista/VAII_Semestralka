const express = require("express");
const { addImgs } = require('../controllers/imgController');
const upload = require("./../multer");

const router = express.Router();

router.post("/add-imgs", upload.array("images", 10), addImgs);

module.exports = router;