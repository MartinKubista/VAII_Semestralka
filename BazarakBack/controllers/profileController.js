const pool = require('../db');


exports.showProfile = async (req, res) => {
    try{
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        const [[user]] = await pool.query(
            "SELECT users.id_user, users.name, users.email, users.created_at FROM users WHERE id_user = ?", [id]
        );

        res.json(user);
        

    } catch(errors){
    console.error(errors);
    res.status(500).json({message: 'Server error'});
    }
};