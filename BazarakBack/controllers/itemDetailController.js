const pool = require('../db');
const { param } = require('../routes/authRoutes');

exports.itemDetail = async (req, res) => {
    try{
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [[item]] = await pool.query(`
            SELECT 
                items.id_item,
                items.id_user,
                (
                    SELECT name 
                    FROM users
                    WHERE users.id_user = items.id_user
                ) AS userName,
                items.name,
                items.price,
                items.description,
                items.condition,
                items.category,
                items.created_at,
                (
                    SELECT image_path 
                    FROM images 
                    WHERE images.id_item = items.id_item 
                    ORDER BY id_img ASC 
                    LIMIT 1
                ) AS image
            FROM items
            WHERE id_item = ?
        `, [id]);

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
    const { text, id_item } = req.body;

    const newText = typeof text === "string" ? text.trim() : "";
    const userId = req.user.id_user;
    const itemId = Number(id_item);

    try {
        if (!newText || !userId || !itemId) {
            return res.status(400).json({ message: "Text, id_use and id_item is required" });
        }

        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid id_user." });
        }

        if (isNaN(itemId)) {
            return res.status(400).json({ message: "Invalid id_item." });
        }

        if(newText.length > 500){
            return res.status(400).json({message: "Text is too long"});
        }

        const [userRows] = await pool.query("SELECT id_user FROM users WHERE id_user = ?", [userId]);

        if (userRows.length === 0) {
            return res.status(400).json({ message: "User does not existst." });
        }

        const [itemRows] = await pool.query("SELECT id_item FROM items WHERE id_item = ?", [itemId]);

        if (itemRows.length === 0) {
            return res.status(400).json({ message: "Item does not existst." });
        }

        await pool.query(
            "INSERT INTO comments (id_item, id_user, text) VALUES (?, ?, ?)",
            [itemId, userId, newText]
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
    const commentId = Number(req.params.id);
    const userId = req.user.id_user;

    if (!Number.isInteger(commentId) || commentId <= 0) {
        return res.status(400).json({ error: "Invalid comment ID" });
    }

    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Invalid text" });
    }

    try {
        const [[comment]] = await pool.query(
            "SELECT id_user FROM comments WHERE id_comment = ?",
            [commentId]
        );

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.id_user !== userId) {
            return res.status(403).json({ error: "You are not allowed to edit this comment" });
        }

        await pool.query(
            "UPDATE comments SET text = ? WHERE id_comment = ?",
            [text, commentId]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Database error" });
    }
};

exports.deleteComment = async (req, res) => {
        const commentId = Number(req.params.id);
        const userId = req.user.id_user;

    if (!Number.isInteger(commentId) || commentId <= 0) {
        return res.status(400).json({ message: "Invalid comment ID" });
    }

    try {
        const [[comment]] = await pool.query(
            "SELECT id_user FROM comments WHERE id_comment = ?",
            [commentId]
        );

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.id_user !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this comment" });
        }

        await pool.query(
            "DELETE FROM comments WHERE id_comment = ?",
            [commentId]
        );

        res.json({ message: "Comment deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
