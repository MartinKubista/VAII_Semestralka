const pool = require('../db');
exports.showItems = async (req, res) => {
    try{
        const [rows] = await pool.query(`
            SELECT 
                items.id_item,
                items.name,
                items.price,
                items.description,
                items.created_at,
                (
                    SELECT image_path 
                    FROM images 
                    WHERE images.id_item = items.id_item 
                    ORDER BY id_img ASC 
                    LIMIT 1
                ) AS image
            FROM items
        `);



        return res.json(rows);

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }
}
