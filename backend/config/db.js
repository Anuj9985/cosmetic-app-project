import {MongoClient} from "mongodb";

const client = new MongoClient("mongodb://localhost:27017")

const connectDB= async()=>{

    try{
        await client.connect();
        console.log("MongoDB connected successfully");

        return client.db("cosmetic_db");
    }
    catch (error){
        console.log("MongoDB connection failed:",error);
        process.exit(1);
    }
};

export default connectDB;