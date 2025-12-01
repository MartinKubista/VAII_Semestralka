const pool = require('../db');


exports.addItem = async (req, res) => {
    const {id_user, name, category, description, price, condition, location } = req.body;

    try{
       
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE id_user= ?",
        [id_user]
    );

    if (rows.length === 0) {
        return res.status(400).json({ message: "Invalid user" });
    }

    if (!name || !category || !description || !price || !condition || !location) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (name.length < 3 || name.length > 100) {
      return res.status(400).json({ error: "Title must be between 3 and 100 characters." });
    }

    if (description.length < 10) {
      return res.status(400).json({ error: "Description must be at least 10 characters long." });
    }

    if (location.length < 2) {
      return res.status(400).json({ error: "Invalid location." });
    }

    const allowedCategories = ["Elektronika", "Nábytok", "Oblečenie", "Šport"];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category." });
    }

    const allowedConditions = ["Nové", "Rozbalené", "Použité"];
    if (!allowedConditions.includes(condition)) {
      return res.status(400).json({ error: "Invalid item condition." });
    }

    const priceNum = Number(price);
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
        name,
        category,
        description,
        Number(price),
        condition,
        location
        ]);

        
        return res.status(201).json({
          message: "Item successfully created."
        });

    } catch(errors){
        console.error(errors);
        res.status(500).json({message: 'Server error'});
    }

}
