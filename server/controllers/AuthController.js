import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUser=async(req,res)=>{
    const {username,password,firstname,lastname}=req.body
    const salt=await bcrypt.genSalt(10)
    const hashPass=await bcrypt.hash(password,salt)
    let user=new UserModel({username,password:hashPass,firstname,lastname})
    try {        
            user= await user.save()
            const token =jwt.sign({
                username:user.username,id:user._id
            },
            process.env.JWT_KEY,{expiresIn:'1h'}
            )
            res.status(200).json({user,token})
        
       
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const loginUser=async(req,res)=>{
    const {username,password}=req.body
    try {
        const user=await UserModel.findOne({username:username})
        if (user) {
            const validity=await bcrypt.compare(password,user.password)
            if (!validity) {
                res.status(400).json("wrong password")
            }else{
                const token =jwt.sign({
                    username:user.username,id:user._id
                },
                process.env.JWT_KEY,{expiresIn:'1h'}
                )
                res.status(200).json({user,token})
           }
        }else{
            res.status(404).json({message:"user Not Found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}