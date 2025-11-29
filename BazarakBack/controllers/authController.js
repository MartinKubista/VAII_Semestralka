const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
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
            "INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully" });

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }

}

exports.login = async (req, res) => {
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


        const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Prihlásenie úspešné.",
            token,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }
}