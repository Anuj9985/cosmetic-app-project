import connectDB from "../config/db.js";
import { ObjectId } from "mongodb";


export const addProductType=async(req,res)=>{

    try{
        const db=await connectDB();

        const {name}=req.body;

        if(!name){
            return res.status(400).json({
                message:"product name is required"
            });
        }

        const existingType= await db.collection("productTypes").findOne({
            name:name
        });

        if(existingType){
            return res.status(400).json({
                message:"product already exist"
            });
        }

        const result=await db.collection("productTypes").insertOne({
            name:name
        });

        res.status(200).json({
            message:"product type added succesfully"
        });
    }
    catch(error){
        console.log("error",error);


        res.status(500).json({
            message:"server error"
        });
    }

}

export const getProductType=async(req,res)=>{

    try{

        const db = await connectDB();

        const productTypes=await db.collection("productTypes").find().toArray();

        res.status(200).json({
            message:"product type found ",
            data:productTypes
        });
    }
    catch(error){
        console.log("error:",error);

        res.status(500).json({
            message:"server error"
        });
    }
};

export const updateProductType=async(req,res)=>{

    try{

        const db=  await connectDB();
        const {id}=req.params;
        const {name}=req.body;

        if(!name){
            return res.status(400).json({
                message:"product type name is required"
            });
        }

        const existingType=await db.collection("productTypes").findOne({
            _id:new ObjectId(id)
        });

        if(!existingType){
            return res.status(400).json({
                message:"product type not found"
            });
        }

        const result =await db.collection("productTypes").updateOne(
            {_id: new ObjectId(id)},
            {$set:{name:name}});

            res.status(200).json({
                message:"product type updated successfully"
            });

    }
  catch(erorr){
    console.log("error:",error);
    res.status(500).json({
        message:"server error"
    });
  }
};

export const deleteProductType=async(req,res)=>{

    try{
        const db = await connectDB();
        const {id}=req.params;

       const existingType=await db.collection("productTypes").findOne({
           _id: new ObjectId(id) 
              });

      if(!existingType){
        return res.status(404).json({
            message:"product type not found"
        });
      }

      const result = await db.collection("productTypes").deleteOne({
        _id:new ObjectId(id)
      });

      res.status(200).json({
        message:"product type deleted successfully"
      });

    }
    catch(error){
        console.log("error:",error);
        res.status(500).json({
            message:"server error"
        });
    }

}