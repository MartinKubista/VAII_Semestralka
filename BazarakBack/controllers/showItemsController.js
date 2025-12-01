const pool = require('../db');
exports.showItems = async (req, res) => {
    try{
        const [rows] = await pool.query(
            "SELECT * FROM items"
        );

        return res.json(rows);

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }
}
