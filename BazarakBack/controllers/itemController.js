const pool = require('../db');


exports.addItem = async (req, res) => {
  const { id_user, name, category, description, price, condition, location } = req.body;

  try {
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedCategory = typeof category === "string" ? category.trim() : "";
    const trimmedDescription = typeof description === "string" ? description.trim() : "";
    const trimmedCondition = typeof condition === "string" ? condition.trim() : "";
    const trimmedLocation = typeof location === "string" ? location.trim() : "";

    const priceNum = Number(price);

    const [rows] = await pool.query(
      "SELECT id_user FROM users WHERE id_user = ?",
      [id_user]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid user" });
    }

    if (!trimmedName || !trimmedCategory || !trimmedDescription || !trimmedCondition || !trimmedLocation) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (trimmedName.length < 3 || trimmedName.length > 100) {
      return res.status(400).json({ error: "Title must be between 3 and 100 characters." });
    }

    if (trimmedLocation.length > 100) {
      return res.status(400).json({ error: "Invalid location." });
    }

    const allowedCategories = ["Elektronika", "Nábytok", "Oblečenie", "Šport"];
    if (!allowedCategories.includes(trimmedCategory)) {
      return res.status(400).json({ error: "Invalid category." });
    }

    const allowedConditions = ["Nové", "Rozbalené", "Použité"];
    if (!allowedConditions.includes(trimmedCondition)) {
      return res.status(400).json({ error: "Invalid item condition." });
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: "Price must be a positive number." });
    }

    const sql = `
      INSERT INTO items 
      (\`id_user\`, \`name\`, \`category\`, \`description\`, \`price\`, \`condition\`, \`location\`)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(sql, [
      id_user,
      trimmedName,
      trimmedCategory,
      trimmedDescription,
      priceNum,
      trimmedCondition,
      trimmedLocation
    ]);

    return res.status(201).json({
      message: "Item successfully created."
    });

  } catch (errors) {
    console.error(errors);
    res.status(500).json({ message: "Server error" });
  }
};