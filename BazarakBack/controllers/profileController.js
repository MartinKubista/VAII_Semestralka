const pool = require('../db');
const bcrypt = require('bcrypt');

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

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id_user; 

  try {
    const oldPwd = typeof oldPassword === "string" ? oldPassword.trim() : "";
    const newPwd = typeof newPassword === "string" ? newPassword.trim() : "";
    const confirmPwd = typeof confirmPassword === "string" ? confirmPassword.trim() : "";

    if (!oldPwd || !newPwd || !confirmPwd) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (newPwd !== confirmPwd) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (newPwd.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    if (newPwd.length > 72) {
      return res
        .status(400)
        .json({ message: "Password can have max 72 characters" });
    }

    if (!/[A-Z]/.test(newPwd)) {
      return res.status(400).json({
        message: "Password must contain at least one uppercase letter",
      });
    }

    if (!/\d/.test(newPwd)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    const [users] = await pool.query(
      "SELECT password FROM users WHERE id_user = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPwd, users[0].password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPwd, 10);

    await pool.query(
      "UPDATE users SET password = ? WHERE id_user = ?",
      [hashedPassword, userId]
    );

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};