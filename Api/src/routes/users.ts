import { Router } from "express";
import { db } from "../db/db";

const router = Router();

router.get("/", async (req, res) => {
  const users = await db.selectFrom("users").selectAll().execute();
  res.json(users);
});

export default router;
