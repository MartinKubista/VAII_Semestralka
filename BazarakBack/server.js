require('dotenv').config();
const express = require('express');
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const imgRoutes = require("./routes/imgRoutes");
const itemDetailRoutes = require("./routes/itemDetailRoutes");
const showItemsRoutes = require("./routes/showItemsRoutes");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/items", imgRoutes);
app.use("/api/items", showItemsRoutes);
app.use("/api/item", itemDetailRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on port 5000"));