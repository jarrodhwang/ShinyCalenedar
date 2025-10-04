const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./calendar.db");

db.serialize(() => {
  db.run(`CREATE TABKE IF NOT EXISTS calendars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_name TEXT NOT NULL, 
        receiver_email TEXT NOT NULL, 
        total_days INTEGER NOT NULL, 
        slug TEXT UNIQUE NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS calendar_days (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        calendar_id INTEGER NOT NULL, 
        day_number INTEGER NOT NULL, 
        content TEXT DEFAULT '',
        FOREIGN KEY(calendar_id) REFERENCES calendars(id), 
        UNIQUE(calendar_id, day_number)
    )`);
});

module.exports = db;
