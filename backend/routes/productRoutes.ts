import express from "express";
import { getProduct } from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProduct)

export default router;