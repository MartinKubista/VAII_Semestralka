const pool = require('../db');

exports.showUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_user, name, email, created_at
      FROM users
      ORDER BY created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load users" });
  }
};


exports.showItems = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        items.id_item,
        users.name AS username,
        items.name,
        items.category,
        items.price,
        items.condition,
        items.created_at
      FROM items
      JOIN users ON users.id_user = items.id_user
      ORDER BY items.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load items" });
  }
};



exports.showReviews = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        reviews.id_review,
        u.name AS username,
        i.name AS itemname,
        reviews.text,
        reviews.rating,
        reviews.created_at
      FROM reviews
      JOIN users u ON u.id_user = reviews.id_user
      JOIN items i ON i.id_item = reviews.id_user_w
      ORDER BY reviews.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load reviews" });
  }
};



exports.showComments = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        comments.id_comment,
        users.name AS username,
        items.name AS itemname,
        comments.text,
        comments.created_at
      FROM comments
      JOIN users ON users.id_user = comments.id_user
      JOIN items ON items.id_item = comments.id_item
      ORDER BY comments.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load comments" });
  }
};