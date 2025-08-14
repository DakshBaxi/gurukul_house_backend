import mongoose from 'mongoose'
import { config } from "dotenv";




config();
export const connectDB = async ()=>{
    try{    
        const uri = process.env.MONGODB_URI;
         if (typeof uri !== "string") {
    return;
}
          await mongoose.connect(uri)
        console.log("connect to mongo");
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    process.exit(1);
    }
}