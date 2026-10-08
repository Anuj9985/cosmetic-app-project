import express from "express";

import { addProduct,getProduct,updateProduct,deleteProduct,getProductByType } from "../controller/productController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router=express.Router();
//for admin
router.post("/products",verifyToken,verifyAdmin,addProduct);
router.get("/products",verifyToken,verifyAdmin,getProduct);
router.put("/products/:id",verifyToken,verifyAdmin,updateProduct);
router.delete("/products/:id",verifyToken,verifyAdmin,deleteProduct);

//for users
router.get("/user/products",verifyToken,getProduct);
router.get("/user/products/type/:productTypeId",verifyToken,getProductByType);

export default router;