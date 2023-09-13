import express from "express";
import {
  createUserController,
  getUserController,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", getUserController);
router.post("/signup", createUserController);

export default router;
