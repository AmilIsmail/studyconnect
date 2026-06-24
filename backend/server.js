import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import moduleRoutes from "./routes/modules.js";
import partnerRoutes from "./routes/partners.js";
import requestRoutes from "./routes/requests.js";
import { initDatabase } from "./database.js";

const app = express();
const port = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/", (_request, response) => {
  response.send("StudyConnect API is running.");
});

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});
app.use("/api/auth", authRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/requests", requestRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Server error" });
});

initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`StudyConnect API running on http://localhost:${port}`);
  });
});
