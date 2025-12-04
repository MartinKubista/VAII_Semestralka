const pool = require('../db');
const { param } = require('../routes/authRoutes');

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
    const { text, id_user, id_item } = req.body;

    try {
        if (!text || typeof text !== "string" || text.trim().length === 0) {
            return res.status(400).json({ message: "Comment cannot be empty." });
        }

      /*  if (!user_name || typeof user_name !== "string" || user_name.trim().length < 2) {
            return res.status(400).json({ message: "Invalid username." });
        }*/

        if (!id_item || isNaN(Number(id_item))) {
            return res.status(400).json({ message: "Invalid item ID." });
        }

        const cleanText = text.trim().slice(0, 500);       
        //const cleanId = id_user.trim().slice(0, 50);   

        await pool.query(
            "INSERT INTO comments (id_item, id_user, text) VALUES (?, ?, ?)",
            [id_item, id_user, cleanText]
        );

        res.status(201).json({ message: "Comment has been added." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.showComments = async (req, res) => {
    try{
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [item] = await pool.query(
            `SELECT comments.id_comment, comments.id_user, comments.id_item, comments.text, comments.created_at, users.name AS user_name FROM comments 
            JOIN users ON (comments.id_user = users.id_user)
            WHERE comments.id_item = ?
            ORDER BY comments.created_at ASC` ,
            [id]
        );

        res.json(item);
        

    } catch(errors){
    console.error(errors);
    res.status(500).json({message: 'Server error'});
    }
};

exports.updateComment = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params;

    try {
        await pool.query(
        "UPDATE comments SET text = ? WHERE id_comment = ?",
        [text, id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
};

exports.deleteComment = async (req, res) => {
    try{
        const commentId = req.params.id;
        if (!commentId || isNaN(commentId)) {
        return res.status(400).json({ message: "Invalid comment ID" });
        }

        const [result] = await pool.query(
        "DELETE FROM comments WHERE id_comment = ?",
        [commentId]
        );

        if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Comment not found" });
        }

        res.json({ message: "Comment deleted successfully" });
        

    } catch(errors){
    console.error(errors);
    res.status(500).json({message: 'Server error'});
    }
};
