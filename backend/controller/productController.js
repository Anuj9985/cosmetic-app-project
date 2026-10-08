import connectDB from "../config/db.js";
import { ObjectId } from "mongodb";

export const addProduct=async(req,res)=>{

    try{

        const db= await connectDB();

        const {name,price,description,productTypeId}=req.body;

        if(!name || !price || !description || !productTypeId){
            return res.status(400).json({
                message:"product details required"
            });
        }

        const productType=await db.collection("productTypes").findOne({
            _id:new ObjectId(productTypeId)
        });

        if(!productType){
            return res.status(404).json({
                message:"product type not found"
            });
        }

        const existingProduct=await db.collection("products").findOne({
            name:name
        });

        if(existingProduct){
            return res.status(400).json({
                message:"product already exist"
            });
        }

        const result= await db.collection("products").insertOne({
            name:name,
            price:price,
            description:description,
            productTypeId:new ObjectId(productTypeId)
        });

        res.status(200).json({
            message:"product added successfully"
        });
    }
    catch(error){
        console.log("error:",error);
        return res.status(500).json({
            message:"server error"
        });
    }
}

export const getProduct=async(req,res)=>{

try{

    const db=await connectDB();

    const products=await db.collection("products").find().toArray();

    res.status(200).json({
        message:"product found",
        data:products
    });
}
catch(error){
    console.log("error:",error);
    return res.status(500).json({
        message:"server error"
    });
}

}


export const getProductByType=async(req,res)=>{

    try{

        const db=await connectDB();

        const {productTypeId}=req.params;

        const productType=await db.collection("productTypes").findOne({
            _id:new ObjectId(productTypeId)
        });

        if(!productType){
            return res.status(400).json({
                message:"product type not found"
            });
        }

        const products=await db.collection("products").find({
            productTypeId: new ObjectId(productTypeId)
        }).toArray();

        res.status(200).json({
            message:"product found",
            data:products
        });

    }
    catch(error){
        console.log("error:",error);
        return res.status(500).json({
            message:"server error"
        });
    }

}


export const updateProduct=async(req,res)=>{

    try{
        const db=await connectDB();

        const {id}=req.params;
        const {name,price,description,productTypeId}=req.body;

        if(!name || !price || !description || !productTypeId){
            return res.status(400).json({
                message:"required all details"
            });
        }

        const existingProduct=await db.collection("products").findOne({
           _id:new ObjectId(id)
        });

        if(!existingProduct){
            return res.status(404).json({
                message:"product not found"
            });
        }

        const productType=await db.collection("productTypes").findOne({
            _id:new ObjectId(productTypeId)
        });

        if(!productType){
            return res.status(404).json({
                message:"product type not found"
            });
        }

        const result=await db.collection("products").updateOne(
            {_id:new ObjectId(id)},
            {$set:{
                name:name,
                price:price,
                description:description,
                productTypeId:new ObjectId(productTypeId)
            }}
        );

        res.status(200).json({
            message:"products updated successfully"
        });
    }
    catch(error){
        console.log("error",error);
        res.status(500).json({
            message:"server error"
        })
    }

}

export const deleteProduct=async(req,res)=>{

    try{
        const db=await connectDB();
        const {id}=req.params;

        const existingProduct=await db.collection("products").findOne({
            _id:new ObjectId(id)
        });

        if(!existingProduct){
            return res.status(404).json({
                message:"product not found"
            });
        }

        const result=await db.collection("products").deleteOne({
            _id:new ObjectId(id)
        });

        res.status(200).json({
            message:"product deleted successfully"
        });
    }
    catch(error){
        console.log("error:",error);
        return res.status(500).json({
            message:"server error"
        });
    }
}