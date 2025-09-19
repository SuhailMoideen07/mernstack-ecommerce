import express from "express"
import { getAllProducts } from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { adminRoute } from "../middleware/auth.middleware.js";
import { getFeaturedProducts,createProduct } from "../controllers/product.controller.js";

const router = express.Router();
 

 router.get("/", protectRoute,adminRoute, getAllProducts)
 router.get("/featured",getFeaturedProducts)
 router.post("/",protectRoute,adminRoute,createProduct)
 export default router