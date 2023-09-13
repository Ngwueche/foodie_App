import express from "express";
import {
  createNewProductController,
  getProductController,
} from "../controllers/product.js";

const router = express.Router();

router.post("/newproduct", createNewProductController);
router.get("/newproduct", getProductController);

export default router;
