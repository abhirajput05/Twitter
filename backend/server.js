import express from "express";
import router from "./routes/auth.js";
import dotenv from "dotenv";
import connecttoMongo from "./db/connection.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app=express();

app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());



app.use("/api/auth",router)


app.listen(8000,()=>{
    console.log("Server is running on port 8000");
    connecttoMongo();
});

