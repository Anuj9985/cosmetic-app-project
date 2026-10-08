import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv";
import producttypeRoutes from "./routes/producttypeRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"


dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/",userRoutes);
app.use("/",producttypeRoutes);
app.use("/",productRoutes);
app.use("/orders",orderRoutes);


const startServer=async ()=>{
try{
     await connectDB();

        app.listen(3000,()=>{
            console.log("Server is running at port 3000");
        });
    }
    catch(error){
        console.log("failed to connect:",error);

    }
};

startServer();