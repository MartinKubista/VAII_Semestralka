const pool = require('../db');

exports.itemDetail = async (req, res) => {
    try{
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [[item]] = await pool.query(
            "SELECT * FROM items WHERE id_item = ?",
            [id]
        );

        const [images] = await pool.query(
            "SELECT image_path FROM images WHERE id_item = ? ORDER BY id_img ASC",
            [id]
        );
        item.images = images.map(img => img.image_path);
        res.json(item);
        

    } catch(errors){
    console.error(errors);
    res.status(500).json({message: 'Server error'});
    }
}  