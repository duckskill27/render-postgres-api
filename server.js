const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ===== PostgreSQL Connection =====
const pool = new Pool({
  host: process.env.PGHOST || "dpg-d28m5hvdiees73f3fko0-a.singapore-postgres.render.com",
  user: process.env.PGUSER || "broodwar",
  password: process.env.PGPASSWORD || "FpjuxkqC64fFf0ZoAqjc3QT6pe1enXZ6",
  database: process.env.PGDATABASE || "flutter_i66q",
  port: process.env.PGPORT || 5432,
  ssl: { rejectUnauthorized: false } // จำเป็นสำหรับ Render
});

// ===== Test API =====
app.get("/", (req, res) => {
  res.json({ message: "Render PostgreSQL API is running!" });
});

// ===== GET Users =====
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM rooms ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
