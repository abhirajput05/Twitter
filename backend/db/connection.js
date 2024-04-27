import mongoose from "mongoose";

const connecttoMongo=async ()=>{
    try {
         const conn=await mongoose.connect(process.env.MONGO_URI);
         console.log("Database connected Successfully");  
    } catch (error) {
        console.log("Error connected to database");
        process.exit(1);
    }
};

export default connecttoMongo;