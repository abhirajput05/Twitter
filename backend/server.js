import express from "express";
import router from "./routes/auth.js";
import dotenv from "dotenv";
import connecttoMongo from "./db/connection.js";
dotenv.config();
const app=express();


app.use("/api/auth",router)


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
    connecttoMongo();
});

