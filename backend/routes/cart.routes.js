import express from "express"
import { updateQuantity, removeAllFromCart,addToCart,getCartProducts } from "../controllers/cart.controller";
import { protectRoute } from "../middleware/auth.middleware";



const router = express.Router();

router.get("/",protectRoute,getCartProducts)
router.post("/",protectRoute,addToCart)
router.delete("/",protectRoute,removeAllFromCart)
router.delete("/:id",protectRoute,updateQuantity)



export default router 