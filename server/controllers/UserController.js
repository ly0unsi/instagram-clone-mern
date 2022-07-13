import UserModel from "../models/UserModel.js";

//get a user
export const getUser=async (req,res)=>{
    const id=req.params.id
    try {
        const user =await UserModel.findById(id)
        if (user) {
            const {password,...others}=user._doc
            res.status(200).json(others)
        }else{
            res.status(404).json("No user Found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
   
}
export const updateUser=async(req,res)=>{
    const id=req.params.id
    const {currentUserId,currentUserAdminStatus,password} =req.body
    if(id===currentUserId || currentUserAdminStatus){
        try {
            if (password) {
                const salt=await bcrypt.genSalt(10)
                req.body.password =await bcrypt(password,salt)
            }
           
            const user =await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Access denied Son!!")
    }
}

export const deleteUser=async (req,res)=>{
    const id =req.params.id
    const {currentUserId,currentUserAdminStatus} =req.body
    if(id===currentUserId || currentUserAdminStatus){
        try {
            const user =await UserModel.findByIdAndDelete(id)
            res.status(200).json("user deleted suucesfully")
        } catch (error) {
            res.status(500).json(error)
        }
        
    }else{
        res.status(403).json("Access denied Son!!")
    }
}

export const followUser=async (req,res)=>{
    const id =req.params.id
    const {currentUserId}=req.body
    if (currentUserId ===id) {
        res.status(403).json("Access denied Son!!")
    }else{
        try {
            const followUser=await UserModel.findById(id)
            const followinguser=await UserModel.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$push:{followers:currentUserId}})
                await followinguser.updateOne({$push:{following:id}})
                res.status(200).json('User followed')
            }else{
                res.status(403).json('User is alraedy followed')
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
    
}
export const unfollowUser=async (req,res)=>{
    const id =req.params.id
    const {currentUserId}=req.body
    if (currentUserId ===id) {
        res.status(403).json("Access denied Son!!")
    }else{
        try {
            const followUser=await UserModel.findById(id)
            const followinguser=await UserModel.findById(currentUserId)
            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({$pull:{followers:currentUserId}})
                await followinguser.updateOne({$pull:{following:id}})
                res.status(200).json('User unfollowed')
            }else{
                res.status(403).json('User is not followed by you')
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    }
    
}
export const getFollowers=async (req,res)=>{
    const id =req.params.id
    const user=await UserModel.findById(id)
    try {
        const folowers = await UserModel.find().where('_id').in(user.followers).exec();
        res.status(200).json(folowers)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const getFollowings=async (req,res)=>{
    const id =req.params.id
    const user=await UserModel.findById(id)
    try {
        const followings = await UserModel.find().where('_id').in(user.following).exec();
        res.status(200).json(followings)
    } catch (error) {
        res.status(400).json(error.message)
    }
}