const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    const  {name, email, password} = req.body;

    try{
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const [existingUser] = await pool.query('SELECT id_user FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }

}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;

    try{
        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
        return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        
        const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id_user: user.id_user, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ token });

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }
}

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            "SELECT id_user AS id, email, name FROM users WHERE id_user = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Používateľ neexistuje." });
        }

        res.json({ message: "Úspech", user: rows[0] });

    } catch (error) {
        console.error("getMe error:", error);
        res.status(500).json({ message: "Serverová chyba" });
    }
};