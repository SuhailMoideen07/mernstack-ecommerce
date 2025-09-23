import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js"
import couponRoutes from "./routes/coupon.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); //allows to parse body of request
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/products",productRoutes)
app.use("api/cart",cartRoutes)
app.use("api/coupen",couponRoutes)
app.use("api/payments",paymentRoutes)

app.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
});
