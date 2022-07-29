import CommentModel from "../models/CommentModel.js"
import UserModel from "../models/UserModel.js"

export const addComment=async (req,res)=>{
    try {
        const newComment =new CommentModel(req.body) 
        newComment.save()
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deleteComment=async (req,res)=>{
    const id=req.params.id
    const {currentUserId} =req.body
    const comment =await CommentModel.findById(id)
    try {
        if (currentUserId===comment.userId) {
            await comment.delete()
            res.status(200).json('Comment deleted')
        }else{
            res.status(403).json("not allowed son")
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getPostComment=async (req,res)=>{
    const id =req.params.id
    let results=[];
    let userd;
    try {
        const comments =await CommentModel.find({postId:id})
        for(const doc of comments){
            try {
                userd =await UserModel.findById(doc.userId)
                results.push({...doc._doc,user:userd}) ;
            } catch (error) {
                console.log(error);
            }
        }
            
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json(error.message)
    }
}