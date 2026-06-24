import express from "express";
import { all, run } from "../database.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, async (_request, response, next) => {
  try {
    response.json(await all("SELECT * FROM requests ORDER BY id DESC"));
  } catch (error) {
    next(error);
  }
});


router.post("/", requireAuth, async (request, response, next) => {
  try {
    const { partnerName, module, semester, message } = request.body;

    if (!partnerName || !module || !semester || !message) {
      return response.status(400).json({ message: "Partner, module, semester and message are required" });
    }

    const result = await run(
      "INSERT INTO requests (senderName, partnerName, module, semester, message, status) VALUES (?, ?, ?, ?, ?, ?)",
      [request.user.name, partnerName, module, semester, message, "open"],
    );

    response.status(201).json({
      id: result.id,
      senderName: request.user.name,
      partnerName,
      module,
      semester,
      message,
      status: "open",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireAuth, async (request, response, next) => {
  try {
    const { status } = request.body;
    if (!status) return response.status(400).json({ message: "Status is required" });

    await run("UPDATE requests SET status = ? WHERE id = ?", [status, request.params.id]);
    response.json({ message: "Request updated" });
  } catch (error) {
    next(error);
  }
});

export default router;
