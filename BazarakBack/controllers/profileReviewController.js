const pool = require('../db');

exports.addReview = async (req, res) => {
    const { text, id_user, rating } = req.body;

    const newText = typeof text === "string" ? text.trim() : "";
    const userId = Number(id_user);
    const userIdw = req.user.id_user;
    const ratingValue = Number(rating);

    try {
        if (!newText || !userId || !userIdw) {
            return res
                .status(400)
                .json({ message: "Text, id_user and userIdw is required" });
        }

        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid id_user." });
        }

        if (isNaN(userIdw)) {
            return res.status(400).json({ message: "Invalid userIdw." });
        }

        if (isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
            return res.status(400).json({
                message: "Rating must be a number between 1 and 5.",
            });
        }

        if (newText.length > 500) {
            return res.status(400).json({ message: "Text is too long" });
        }

        const [userRows] = await pool.query(
            "SELECT id_user FROM users WHERE id_user = ?",
            [userId]
        );

        if (userRows.length === 0) {
            return res.status(400).json({ message: "User does not exist." });
        }

        const [itemRows] = await pool.query(
            "SELECT id_user FROM users WHERE id_user = ?",
            [userIdw]
        );

        if (itemRows.length === 0) {
            return res.status(400).json({ message: "Item does not exist." });
        }

        await pool.query(
            "INSERT INTO reviews (id_user_w, id_user, text, rating) VALUES (?, ?, ?, ?)",
            [userIdw, userId, newText, ratingValue]
        );

        res.status(201).json({ message: "Review has been added." });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.showReviews = async (req, res) => {
    try {
        const id = req.params.id;

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [items] = await pool.query(
            `SELECT 
                reviews.id_review,
                reviews.id_user,
                reviews.id_user_w AS id_userw,
                reviews.text,
                reviews.rating,
                reviews.created_at,
                author.name AS user_name
            FROM reviews
            JOIN users target ON reviews.id_user = target.id_user
            JOIN users author ON reviews.id_user_w = author.id_user
            WHERE reviews.id_user = ?
            ORDER BY reviews.created_at ASC;`,
            [id]
        );

        res.json(items);

    } catch (errors) {
        console.error(errors);
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateReview = async (req, res) => {
    const { text, rating } = req.body;
    const reviewId = Number(req.params.id);
    const userId = req.user.id_user;

    if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({ error: "Invalid review ID" });
    }

    if (typeof text !== "string" || text.trim() === "") {
        return res.status(400).json({ error: "Invalid text" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Invalid rating" });
    }

    try {
        const [[review]] = await pool.query(
            "SELECT id_user_w FROM reviews WHERE id_review = ?",
            [reviewId]
        );

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        if (review.id_user_w !== userId) {
            return res.status(403).json({ error: "You are not allowed to edit this review" });
        }

        await pool.query(
            "UPDATE reviews SET text = ?, rating = ? WHERE id_review = ?",
            [text, rating, reviewId]
        );

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
};


exports.deleteReview = async (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    if (!Number.isInteger(reviewId) || reviewId <= 0) {
        return res.status(400).json({ message: "Invalid review ID" });
    }

    try {
        const [[review]] = await pool.query(
            "SELECT id_user_w FROM reviews WHERE id_review = ?",
            [reviewId]
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        if (review.id_userw !== userId) {
            return res.status(403).json({ message: "You are not allowed to delete this review" });
        }

        await pool.query(
            "DELETE FROM reviews WHERE id_review = ?",
            [reviewId]
        );

        res.json({ message: "Review deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
