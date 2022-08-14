import mongoose from "mongoose"
import PostModel from "../models/PostModel.js"
import UserModel from "../models/UserModel.js"
import CommentModel from "../models/CommentModel.js"
import cloudinary from "../Utils/Cloudinary.js"
import NotModel from "../models/NotificationModel.js"
export const addPost=async (req,res)=>{
    const {userId,desc,image,user} =req.body
    const newPost =new PostModel({userId,desc,user})
        try {
            if (image) {
               
                const result =await cloudinary.uploader.upload(image,
                    {
                    folder:"posts",
                    }
                )
                newPost.image=result.secure_url
               
            }
               
            await newPost.save()
            res.status(200).json({msg:"post created",post:newPost})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getPost=async (req,res)=>{
    const id =req.params.id
    try {
        const post=await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const updatePost =async (req,res)=>{
    const postId=req.params.id
    const {userId,image,desc}=req.body
    try {
        const post =await PostModel.findById(postId)
      
        if (userId===post.userId) {
            if (image) {
               
                const result =await cloudinary.uploader.upload(image,
                    {
                    folder:"posts",
                    }
                )
                post.image=result.secure_url
                await post.updateOne({$set:{image:result.secure_url,desc:desc},new:true})
               
            }else{
               
                await post.updateOne({$set:{desc:desc},new:true})
            }

            post.desc=desc
            res.status(200).json(post)
        }else{
            res.status(403).json("Action forbidden Son!!")
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deletePost=async (req,res)=>{
    const postId=req.params.id
    const {userId} =req.body
    try {
        const post =await PostModel.findById(postId)
        await CommentModel.deleteMany({"postId":post._id})
        
        if (userId===post.userId) {
            await PostModel.deleteOne(post)
            res.status(200).json("Post deleted Son!!")
        }else{
            res.status(403).json("Action forbidden Son!!")
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const likePost = async (req, res) => {
   
    const id = req.params.id;
    const { userId } = req.body;
    
    try {
      const post = await PostModel.findById(id);
      if (post.likes.includes(userId)) {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post disliked");
      } else {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

export const getTimelinePosts=async (req,res)=>{
    const userId=req.params.id
    try {
        const userPosts =await PostModel.find({userId:userId});
        const followingPosts=await UserModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:"posts",
                    localField:"following",
                    foreignField:"userId",
                    as:"followingPosts"
                }
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                }
            }
                
        ])
       
        let userd={};
        let posts=userPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>{
            return b.createdAt - a.createdAt
        })
        let results=[];
        for(const doc of posts){
            try {
                userd =await UserModel.findById(doc.userId)
                if (doc.userId===userId)   results.push({...doc._doc,user:userd})  ; else   results.push({...doc,user:userd});
            } catch (error) {
                res.status(400).json(error.message)
            }
        }

     
        res.status(200).json(results)
       
    } catch (error) {
        res.status(400).json(error.message)
    }


    
}