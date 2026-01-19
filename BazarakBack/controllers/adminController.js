const pool = require('../db');
const {cleanupUnusedCarImages} = require('../cleanUnusedImages.js');

exports.showUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id_user, name, email, created_at
      FROM users
      WHERE role = "user"
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
            reviews.id_user,
            reviews.id_user_w AS id_userw,
            reviews.text,
            reviews.rating,
            reviews.created_at,
            author.name AS username,
            target.name AS targetname
        FROM reviews
        JOIN users target ON reviews.id_user = target.id_user
        JOIN users author ON reviews.id_user_w = author.id_user
        ORDER BY reviews.created_at ASC;
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
        comments.id_item,
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


exports.deleteComments = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM comments WHERE id_comment = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};


exports.deleteReviews = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM reviews WHERE id_review = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Review not found" });
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete review" });
  }
};


exports.deleteItems = async (req, res) => {
  const { id } = req.params;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM comments WHERE id_item = ?", [id]);
    await pool.query("DELETE FROM images WHERE id_item = ?", [id]);

    const [result] = await conn.query(
      "DELETE FROM items WHERE id_item = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "Item not found" });
    }

    await cleanupUnusedCarImages(id);

    await conn.commit();
    res.sendStatus(204);
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  } finally {
    conn.release();
  }
};


exports.deleteUsers = async (req, res) => {
  const { id } = req.params;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query("DELETE FROM comments WHERE id_user = ?", [id]);
    await conn.query("DELETE FROM reviews WHERE id_user = ?", [id]);

    const [items] = await conn.query(
      "SELECT id_item FROM items WHERE id_user = ?",
      [id]
    );

    for (const item of items) {
      await pool.query("DELETE FROM images WHERE id_item = ?", [item.id_item]);
      await conn.query("DELETE FROM items WHERE id_item = ?", [item.id_item]);

    }

    const [result] = await conn.query(
      "DELETE FROM users WHERE id_user = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    await cleanupUnusedCarImages(id);

    await conn.commit();
    res.sendStatus(204);
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to delete user" });
  } finally {
    conn.release();
  }
};

