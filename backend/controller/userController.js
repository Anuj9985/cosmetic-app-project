import connectDB from "../config/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const signup=async(req,res)=>{
try{
const db= await connectDB();

    const {name,email,password}=req.body;

    if(!name || !email || !password){
       return res.status(400).json({
        message:"fill all fields"
       });
    }


    const existingUser= await db.collection("users").findOne({
        email:email
    });

    if(existingUser){
        return res.status(400).json({
            message:"user already exist"
        });
    }

    const hashedPassword= await bcrypt.hash(password,10);

    const result= await db.collection("users").insertOne({
        name:name,
        email:email,
        password:hashedPassword,
        role:"user"
    });

    res.status(200).json({
        message:"signup successfull",
        userId:result.insertedId
    });
}
catch(error){
    console.log("error:",error);

    res.status(500).json({
        message:"server error occured"
    });
}

}

export const login=async(req,res)=>{

    try{
    
        const db= await connectDB();

        const {email,password}=req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"fill all fileds"
            });
        }

        const existingUser=await db.collection("users").findOne({
            email:email
        });



      const passwordCheck=await bcrypt.compare(
        password,existingUser.password
      )

      if(!passwordCheck){
        return res.status(404).json({
            message:"invalid password"
        });
      }

      const token=jwt.sign({
        userId:existingUser._id,
        role:existingUser.role
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
        message:"login successful",
        token:token
    });
}
catch(error){
    console.log("error:",error);
    res.status(500).json({
        message:"server error"
    });
}
};