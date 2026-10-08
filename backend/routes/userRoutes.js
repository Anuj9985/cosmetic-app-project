import express from "express";
import { signup,login } from "../controller/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { verifyAdmin } from "../middleware/adminMiddleware.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);

router.get("/protected",verifyToken,(req,res)=>{
    res.status(200).json({
        message:"you have access to the protected route",
        userId:req.userId,
        role:req.role
    });
});

router.get("/admin-test",verifyToken,verifyAdmin,(req,res)=>{
    res.status(200).json({
        message:"admin access successful"
    });
});


export default router;