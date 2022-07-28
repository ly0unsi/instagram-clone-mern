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
    try {

        const comments =await UserModel.aggregate([
        
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: 'comments'
                    }
            }
        ])
        
        res.status(200).json(comments)
    } catch (error) {
        
    }

}