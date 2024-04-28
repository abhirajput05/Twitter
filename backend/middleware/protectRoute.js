import User from "../models/user.js";
import jwt from "jsonwebtoken";
export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized:No token Found !"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized Invalid token"});
        }
        console.log(token);
        const user=await User.findById(decoded.userID).select("-password");
        if(!user){
            return res.status(401).json({error:"User not found !"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log(error);
    }

}