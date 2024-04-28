import JWT from "jsonwebtoken";

export const generateTokenAndSetCookies=(userID,res)=>{
    const token=JWT.sign({userID},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });

    res.cookie("jwt",token,{
     maxAge:15*24*60*60*1000, //MS
     httpOnly:true,
     sameSite:"strict",
     
    })

}