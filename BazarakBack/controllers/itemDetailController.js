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

exports.addComment = async (req, res) => {
    const { text, user_name, id_item } = req.body;

    try {
        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

        if (!user_name || typeof user_name !== "string" || user_name.trim().length < 2) {
            return res.status(400).json({ message: "Invalid username." });
        }

        if (!id_item || isNaN(Number(id_item))) {
            return res.status(400).json({ message: "Invalid item ID." });
        }

        const cleanText = text.trim().slice(0, 500);       
        const cleanUser = user_name.trim().slice(0, 50);   

        await pool.query(
            "INSERT INTO comments (id_item, user_name, text) VALUES (?, ?, ?)",
            [id_item, cleanUser, cleanText]
        );

        res.status(201).json({ message: "Comment has been added." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.showComments = async (req, res) => {
    try{
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [item] = await pool.query(
            "SELECT * FROM comments WHERE id_item = ?",
            [id]
        );

        res.json(item);
        

    } catch(errors){
    console.error(errors);
    res.status(500).json({message: 'Server error'});
    }
};