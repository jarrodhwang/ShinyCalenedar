import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = new Database("data.db");
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

app.post("/users", (req, res) => {
  const { name } = req.body;
  db.prepare("INSERT INTO users (name) VALUES (?)").run(name);
  res.sendStatus(200);
});

app.listen(3001, () => console.log("✅ Backend running → http://localhost:3001"));
