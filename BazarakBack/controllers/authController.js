const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

try {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedPassword = typeof password === "string" ? password.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
        return res.status(400).json({ message: "Missing fields" });
    }

    if (trimmedName.length > 50) {
        return res.status(400).json({ message: "Name is too long" });
    }

    if (trimmedEmail.length > 50) {
        return res.status(400).json({ message: "Email is too long" });
    }

    if (trimmedPassword.length > 72) {
        return res.status(400).json({ message: "Password is too long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (trimmedPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    if (!/[A-Z]/.test(trimmedPassword)) {
        return res.status(400).json({ message: "Password must contain at least one uppercase letter" });
    }

    if (!/\d/.test(trimmedPassword)) {
        return res.status(400).json({ message: "Password must contain at least one number" });
    }

    const [existingUser] = await pool.query(
        'SELECT id_user FROM users WHERE email = ?',
        [trimmedEmail]
    );

    if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [trimmedName, trimmedEmail, hashedPassword, "user"]
    );

    res.status(201).json({ message: "User registered successfully" });

} catch (errors) {
    console.error(errors);
    res.status(500).json({ message: 'Server error' });
}

}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const trimmedEmail = typeof email === "string" ? email.trim() : "";
        const trimmedPassword = typeof password === "string" ? password.trim() : "";

        if (!trimmedEmail || !trimmedPassword) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        if (trimmedEmail.length > 50) {
            return res.status(400).json({ message: "Email is too long" });
        }

        if (trimmedPassword.length > 72) {
            return res.status(400).json({ message: "Password is too long" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            return res.status(400).json({ message: "The email is not in the correct format." });
        }

        const [rows] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [trimmedEmail]
        );

        if (rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = rows[0];

        const isValid = await bcrypt.compare(trimmedPassword, user.password);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id_user: user.id_user, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({ token });

    } catch (errors) {
        console.error(errors);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.query(
            "SELECT id_user AS id, email, name, role FROM users WHERE id_user = ?",
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