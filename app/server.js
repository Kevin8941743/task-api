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
    try {
    const result = await pool.query("SELECT * FROM tasks");
    const newFormat = result.rows.map(task => task.text).join("\n");
    res.set('Content-Type', 'text/plain');
    res.send(newFormat);

    } catch (error) {
        console.error("Error viewing the tasks: ", error);
        return res.status(500).send({message: "Error outputting the tasks"})
    }
})

app.delete("/tasks/:id", async(req, res) => {
    try {
        const taskId = req.params.id;
        
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [taskId]
        );

        if (result.rowCount === 0) {
            return res.status(404).send({message: "Task not found."})
        }
        return res.status(204).send();

    } catch (error) {
        console.error("Error deleting task: ", error);
        return res.status(500).send({message: "Error deleting the task."});
    }
});

app.post("/tasks", async(req, res) => {

    try {
        const { text } = req.body;
        
        const result = await pool.query(
        "INSERT INTO tasks(text) VALUES($1) RETURNING *",
        [text]
    );
        res.status(201).json(result.rows[0]);

    } catch (error){
        console.error("Task cannot be added: ", error);
        return res.status(500).send({message: "Error adding the task."})
    }
});

app.listen(3000, () => {
    console.log("Task API running on port 3000!");
})

