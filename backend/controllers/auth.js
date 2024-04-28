import { generateTokenAndSetCookies } from "../lib/utils/generateToken.js";
import User from "../models/user.js";
import bcrpyt from "bcryptjs";

import { validationResult } from "express-validator";
export const signup= async(req,res)=>{
   try {
    console.log(req.body.fullName);
    const {fullName,email,username,password}=req.body;
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const existingUser=await User.findOne({username});
    if(existingUser){
        return res.status(400).json({error:"Username is already taken"});
    }
    const exisitingemail=await User.findOne({email});
    if(exisitingemail){
        return res.status(400).json({error:"Email is already taken"});
    }
    const salt=await bcrpyt.genSalt(10);
    const hashedpass=await bcrpyt.hash(password,salt);
    const newUser=await User.create({fullName,email,username,password:hashedpass});
    if(newUser){
       generateTokenAndSetCookies(newUser._id,res);
       await newUser.save();
       res.status(201).json({
         _id:newUser._id,
         fullName:newUser.fullName,
         username:newUser.username,
         email:newUser.email
       })
    }
    else{
    console.log("Error in Request");
    }
   } catch (error) {
     console.log(error);
   }
}

export const login= async(req,res)=>{
    try {
       const {username,password}=req.body;
       const user=await User.findOne({username});
       const ispass=await bcrpyt.compare(password,user?.password || ""); 
       if(!user || !ispass){
         return res.status(400).json({error:"Invalid username or passsword"});
       }
       generateTokenAndSetCookies(user._id,res);
       res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        email:user.email
      });

    } catch (error) {
        console.log(error);
    }
}

export const logout= async(req,res)=>{
   try {
    
    res.clearCookie().status(200).json({message:"Logged out successfully"});
   } catch (error) {
     console.log(error);
   }
};


export const getMe=async (req,res) =>{
    try {
        const user=await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
          console.log(error);
    }
}