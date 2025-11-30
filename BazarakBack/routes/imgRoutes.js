import express from "express";
import { upload } from "./multer.js";
import { route } from "./authRoutes.js";
const router = express.Router();

router.post("/items", upload.array("images", 10), (req, res) => {
  const files = req.files;

  const imagePaths = files.map((file) => "/uploads/" + file.filename);

  // Tu uložíš do DB
  // title, price, user_id, a imagePaths


  res.json({
    message: "Item created",
    images: imagePaths
  });
});

router.post();

export default router;