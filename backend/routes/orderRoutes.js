import express from "express";
import { addOrder,getOrder,getOrderById,updateOrder,cancelOrder,getAllOrder,adminCancelOrder } from "../controller/orderController.js";
import { verifyToken} from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();


router.post("/add",verifyToken,addOrder);
router.get("/get",verifyToken,getOrder);
router.get("/:id",verifyToken,getOrderById);
router.put("/cancel/:id",verifyToken,cancelOrder);

//admin
router.put("/:id",verifyToken,verifyAdmin,updateOrder);
router.get("/admin/all",verifyToken,verifyAdmin,getAllOrder);
router.put("/admin/cancel/:id",verifyToken,verifyAdmin,adminCancelOrder);



export default router;