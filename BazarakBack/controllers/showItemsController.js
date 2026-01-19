const pool = require('../db');

exports.showItems = async (req, res) => {
    try {
        const {
            query,
            category,
            minPrice,
            maxPrice,
            location,
            added
        } = req.query;

        let sql = `
            SELECT 
                items.id_item,
                items.name,
                (SELECT name FROM users WHERE users.id_user = items.id_user) AS username,
                items.price,
                items.description,
                items.created_at,
                items.condition,
                items.category,
                items.location,
                (
                    SELECT image_path 
                    FROM images 
                    WHERE images.id_item = items.id_item 
                    ORDER BY id_img ASC 
                    LIMIT 1
                ) AS image
            FROM items
            WHERE 1=1
        `;

        const params = [];

        if (query) {
            sql += ` AND (items.name LIKE ? OR items.description LIKE ?)`;
            params.push(`%${query}%`, `%${query}%`);
        }

        if (category) {
            sql += ` AND items.category = ?`;
            params.push(category);
        }

        if (minPrice) {
            sql += ` AND items.price >= ?`;
            params.push(minPrice);
        }

        if (maxPrice) {
            sql += ` AND items.price <= ?`;
            params.push(maxPrice);
        }

        if (location) {
            sql += ` AND items.location LIKE ?`;
            params.push(`%${location}%`);
        }

        if (added) {
            if (added === "24h") {
                sql += ` AND items.created_at >= NOW() - INTERVAL 1 DAY`;
            }
            if (added === "7d") {
                sql += ` AND items.created_at >= NOW() - INTERVAL 7 DAY`;
            }
            if (added === "30d") {
                sql += ` AND items.created_at >= NOW() - INTERVAL 30 DAY`;
            }
        }

        sql += ` ORDER BY items.created_at DESC`;

        const [rows] = await pool.query(sql, params);

        return res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};