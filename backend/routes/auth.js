import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { get, run } from "../database.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "2h" });
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    program: user.program,
  };
}

router.post("/register", async (request, response, next) => {
  try {
    const { name, email, password, program } = request.body;

    if (!name || !email || !password || !program) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await get("SELECT id FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return response.status(409).json({ message: "Email is already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await run(
      "INSERT INTO users (name, email, password_hash, program) VALUES (?, ?, ?, ?)",
      [name, email, passwordHash, program],
    );
    const user = { id: result.id, name, email, program };

    response.status(201).json({ token: createToken(user), user });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return response.status(401).json({ message: "Invalid email or password" });
    }

    response.json({ token: createToken(user), user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
