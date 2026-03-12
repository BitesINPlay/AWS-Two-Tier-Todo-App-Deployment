const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = 80;

const dbConfig = {
  host: process.env.DB_HOST || "your-rds-endpoint",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "your-password",
  database: process.env.DB_NAME || "todoapp",
  port: process.env.DB_PORT || 3306
};

app.get("/", async (req, res) => {
  try {
    const conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute("SELECT * FROM tasks");
    await conn.end();

    const tasksHtml = rows.map(task => `
      <li><strong>${task.title}</strong> - ${task.completed ? "Done" : "Pending"}</li>
    `).join("");

    res.send(`
      <h1>Todo App is running</h1>
      <p>Connected to MySQL successfully</p>
      <ul>${tasksHtml}</ul>
    `);
  } catch (err) {
    res.status(500).send(`
      <h1>Database connection failed</h1>
      <pre>${err.message}</pre>
    `);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
