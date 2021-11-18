import { Router } from "express";

export const router = Router();
export const path = "";

router.get("/", (req, res, next) => {
  res.send("Hello World!");
});
