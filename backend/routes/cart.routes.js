import express from "express"
import addToCart from "../controllers/cart.controller.js"
import { protectRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/",protectRoute,addToCart)


export default router 