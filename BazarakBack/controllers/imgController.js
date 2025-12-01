const pool = require("../db");

exports.addImgs = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT MAX(id_item) AS maxId FROM items');

    const maxId = rows[0]?.maxId;

    if (maxId === undefined || maxId === null || isNaN(maxId)) {
        return res.status(400).json({ error: "Missing maxId" });
    }

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imagePaths = files.map(file => "/uploads/" + file.filename);

    for (const img of imagePaths) {
      await pool.query(
        "INSERT INTO images (id_item, image_path) VALUES (?, ?)",
        [maxId, img]
      );
    }

    return res.json({
      message: "Images saved",
      images: imagePaths
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};