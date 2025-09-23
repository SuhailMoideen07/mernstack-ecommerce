import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";  
import { validateCoupon,getCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/",protectRoute,getCoupon)
router.get("/",protectRoute,validateCoupon)


export default router