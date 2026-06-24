import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";

sqlite3.verbose();
export const db = new sqlite3.Database("./backend/studyconnect.sqlite");

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function callback(error) {
      if (error) reject(error);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
}

export async function initDatabase() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    program TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    faculty TEXT NOT NULL,
    program TEXT NOT NULL,
    semester INTEGER NOT NULL,
    name TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS partners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    program TEXT NOT NULL,
    semester INTEGER NOT NULL,
    format TEXT NOT NULL,
    module TEXT NOT NULL
  )`);

  await run(`CREATE TABLE IF NOT EXISTS requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    senderName TEXT NOT NULL,
    partnerName TEXT,
    module TEXT NOT NULL,
    semester INTEGER NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open'
  )`);

  try {
    await run("ALTER TABLE requests ADD COLUMN partnerName TEXT");
  } catch {
    // Column already exists.
  }

  const moduleCount = await get("SELECT COUNT(*) AS count FROM modules");
  if (moduleCount.count === 0) {
    const modules = [
      ["Informatics", "Applied Informatics", 1, "Programming 1"],
      ["Informatics", "Applied Informatics", 2, "Programming 2"],
      ["Informatics", "Applied Informatics", 3, "Web Applications"],
      ["Informatics", "Applied Informatics", 3, "Databases"],
      ["Informatics", "Applied Informatics", 4, "Software Engineering"],
      ["Electrical Engineering", "Electrical Engineering", 1, "Physics"],
      ["Electrical Engineering", "Electrical Engineering", 2, "Digital Systems"],
      ["Mechanical Engineering", "Mechanical Engineering", 1, "Technical Mechanics"],
      ["Business", "Business Information Systems", 3, "Project Management"],
      ["Civil Engineering", "Civil Engineering", 2, "Structural Analysis"],
    ];

    for (const item of modules) {
      await run("INSERT INTO modules (faculty, program, semester, name) VALUES (?, ?, ?, ?)", item);
    }
  }

  const partnerCount = await get("SELECT COUNT(*) AS count FROM partners");
  if (partnerCount.count === 0) {
    const partners = [
      ["Anna Müller", "Applied Informatics", 3, "Online", "Web Applications"],
      ["Marc Herrmann", "Business Information Systems", 3, "In Person", "Project Management"],
      ["Sara Klein", "Applied Informatics", 4, "Both", "Software Engineering"],
      ["Tom Weber", "Applied Informatics", 2, "Online", "Programming 2"],
    ];

    for (const item of partners) {
      await run("INSERT INTO partners (name, program, semester, format, module) VALUES (?, ?, ?, ?, ?)", item);
    }
  }

  const requestCount = await get("SELECT COUNT(*) AS count FROM requests");
  if (requestCount.count === 0) {
    await run(
      "INSERT INTO requests (senderName, partnerName, module, semester, message, status) VALUES (?, ?, ?, ?, ?, ?)",
      ["Anna Müller", "Test Student", "Web Applications", 3, "Hi, would you like to study together?", "open"],
    );
  }

  const testUser = await get("SELECT id FROM users WHERE email = ?", ["test@htwg-konstanz.de"]);
  if (!testUser) {
    const hash = await bcrypt.hash("test1234", 10);
    await run(
      "INSERT INTO users (name, email, password_hash, program) VALUES (?, ?, ?, ?)",
      ["Test Student", "test@htwg-konstanz.de", hash, "Applied Informatics"],
    );
  }
}
