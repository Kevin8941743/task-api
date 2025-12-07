import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
    host: process.env.PG_HOST || "localhost",
    user: process.env.PG_USER || "postgres",
    password: process.env.PG_PASSWORD || "password",
    database: process.env.PG_DB || "taskdb",
    port: 5432
});

app.get("/tasks", async(req, res) => {
    const result = await pool.query("SELECT * FROM tasks");
    const newFormat = result.rows.map(task => task.text).join("\n");
    res.set('Content-Type', 'text/plain');
    res.send(newFormat);
})

app.post("/tasks", async(req, res) => {
    const { text } = req.body;

    const result = await pool.query(
        "INSERT INTO tasks(text) VALUES($1) RETURNING *",
        [text]
    );
    res.status(201).json(result.rows[0]);
});

app.listen(3000, () => {
    console.log("Task API running on port 3000!");
})

