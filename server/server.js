import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Get all todos
app.get("/todos", async (req, res) => {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
});

// Add todo
app.post("/todos", async (req, res) => {
    const { text } = req.body;
    const result = await pool.query(
        "INSERT INTO todos (text) VALUES ($1) RETURNING *",
        [text]
    );
    res.json(result.rows[0]);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Deleted" });
});

app.listen(10000, () => console.log("Server running"));
