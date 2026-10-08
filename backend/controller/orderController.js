
import connectDB from "../config/db.js";
import { ObjectId } from "mongodb";

export const addOrder=async(req,res)=>{

    try{
        const db=await connectDB();

        const {productId,quantity}=req.body;

        if(!productId || !quantity){
            return res.status(400).json({
            message:"product id and quntity is required"
            });
        }

        const product= await db.collection("products").findOne({
            _id:new ObjectId(productId)
        });

        if(!product){
            return res.status(404).json({
                message:"product not found"
            });
        }

        const totalPrice=product.price * quantity;

        const result = await db.collection("orders").insertOne({
           userId:new ObjectId(req.userId),
           productId: new ObjectId(productId),
           quantity:quantity,
           totalPrice:totalPrice
        });

        res.status(200).json({
            message:"order placed successfully",
            orderId:result.insertedId
        });
    }
    catch(error){
        console.log("error:",error);

        return res.status(500).json({
            message:"server error"
        });
    }

}

export const getOrder=async(req,res)=>{

    try{

        const db = await connectDB();

        const orders=await db.collection("orders").find({
            userId:new ObjectId(req.userId)
        }).toArray();

        res.status(200).json({
            message:"order found",
            data:orders
        });

    }
    catch(error){
        console.log("error:",error);
        return res.status(500).json({
            message:"server error"
        });
    }

}

export const getOrderById=async(req,res)=>{

    try{
        const db=await connectDB();

        const {id}=req.params;

        const order=await db.collection("orders").findOne({
            _id:new ObjectId(id),
            userId:new ObjectId(req.userId)
        });

        if(!order){
            return res.status(404).json({
                message:"order not found"
            });
        }

        res.status(200).json({
            message:"order found",
            data:order
        });

    }
    catch(error){
        console.log("error:",error);

        return res.status(500).json({
            message:"server error"
        });
    }

}

export const updateOrder=async(req,res)=>{

    try{

        const db= await connectDB();

        const {id}=req.params;
        const {status}=req.body;

        if(!status){
            return res.status(400).json({
                message:"order status required"
            });
        }

        const existingOrder=await db.collection("orders").findOne({
        _id:new ObjectId(id)
        });

        if(!existingOrder){
            return res.status(404).json({
                message:"order not found"
            });
        }

        const result=await db.collection("orders").updateOne({
            _id: new ObjectId(id)
        },
        {
            $set:{status:status}
        });
 
        res.status(200).json({
            message:"order updated successfully"
        })
    }
catch(error){
    console.log("error:",error);

    return res.status(500).json({
        message:"server error"
    });
}

}

export const cancelOrder=async(req,res)=>{

    try{

        const db= await connectDB();

        const {id}=req.params;

        const existingOrder=await db.collection("orders").findOne({

            _id:new ObjectId(id),
            userId:new ObjectId(req.userId)
        });

        if(!existingOrder){
            return res.status(404).json({
                message:'order not found'
            });
        }

        if(existingOrder.status==="shipped"||existingOrder.status==="delivered"){
            return res.status(400).json({
                message:"order can not  be cancled"
            });
        }

        const result = await db.collection("orders").updateOne({
            _id:new ObjectId(id),
            userId:new ObjectId(req.userId)
        },{
            $set:{
                status:"canceled"
            }
        });

        res.status(200).json({
            message:"order canceled successfully"
        });
    }
    catch(error){
        console.log("error:",error);

        return res.status(500).json({
            message:"server error"
        });
    }

}

export const getAllOrder=async(req,res)=>{

    try{

        const db= await connectDB();

        const orders = await db.collection("orders").find().toArray();

        res.status(200).json({
            message:"orders found",
            data:orders
        });
    }
    catch(error){
        console.log("error:",error);
        return res.status(500).json({
            message:"server error"
        });
    }

}

export const adminCancelOrder=async(req,res)=>{

    try{

        const db=await connectDB();
        const {id}=req.params;

        const existingOrder=await db.collection("orders").findOne({
            _id:new ObjectId(id)
        });

        if(!existingOrder){
            return res.status(404).json({
                message:"order not found"
            });
        }

        if(existingOrder.status==="shipped" || existingOrder.status==="delivered"){
            return res.status(400).json({
                message:"order cannot be cancled"
            });
        }

        const result = await db.collection("orders").updateOne({
            _id:new ObjectId(id)
        },{
            $set:{
                status:"canceled"
            }
        });

        res.status(200).json({
            message:"order canceled successfully"
        });

    }
    catch(error){
        console.log("error:",error);

        return res.status(500).json({
            message:"server error"
        });
    }

}