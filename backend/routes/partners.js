import express from "express";
import { all } from "../database.js";

const router = express.Router();

router.get("/", async (_request, response, next) => {
  try {
    response.json(await all("SELECT * FROM partners ORDER BY name"));
  } catch (error) {
    next(error);
  }
});

export default router;
