import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: "15m",
    })
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: "7d",
    })
    return { accessToken, refreshToken}
};
const storeRefreshToken = async(userId,refreshToken) =>
{
    await Redis.set(`refresh_token:${userId}`,refreshToken,"EX",7*24*60*60);
}
const setCookies=(res, accessToken, refreshToken)=>{
    res.cookie("accessToken",accessToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 15*60*1000,
    })
    res.cookie("refreshToken",refreshToken, {
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 15*60*1000,
    })
}
export const signup = async (req, res) => {
    const {email, password, name} = req.body;
   try {
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({message: "This email already exists"});
    }
    const user = await User.create({name,email,password})
//authenticate the user
    
    const {accessToken, refreshToken} = generateTokens(user._id)    
    await storeRefreshToken(userId,refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({user,message:"User created successfully"})
   } catch (error) {
    res.status(500).json({message: error.message})
    
   }
    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({message: "This email already exists"});
    }
    const user = await User.create({name,email,password})
    res.status(201).json({user,message:"User created successfully"})
    
}

export const login = async (req, res) => {
    res.send("Login route called");
}

export const logout = async (req,res)=>{
    res.send("Logout function called")
}