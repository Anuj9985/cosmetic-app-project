import express from "express";

import { addProductType,getProductType,updateProductType,deleteProductType } from "../controller/producttypeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";


const router=express.Router();

router.post("/product-types",verifyToken,verifyAdmin,addProductType);
// router.get("/product-types",verifyToken,verifyAdmin,getProductType);
router.get("/product-types", verifyToken, getProductType);
router.put("/product-types/:id",verifyToken,verifyAdmin,updateProductType);
router.delete("/product-types/:id",verifyToken,verifyAdmin,deleteProductType);
export default router;