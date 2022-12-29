import CommentModel from "../models/CommentModel.js"
import NotModel from "../models/NotificationModel.js"
import UserModel from "../models/UserModel.js"

export const addComment = async (req, res) => {
    const { senderId, receverId, postId, body, userId } = req.body
    try {
        let newComment = new CommentModel({ postId, body, userId })
        newComment.save()
        const userd = await UserModel.findById(newComment.userId)
        newComment = { ...newComment._doc, user: userd }
        console.log(userId, receverId, senderId);
        if (userId !== receverId) {

            await new NotModel({ receverId, senderId, type: 2, read: false, postId }).save()
        }
        res.status(200).json(newComment)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deleteComment = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body
    const comment = await CommentModel.findById(id)
    try {
        if (currentUserId === comment.userId) {
            await comment.delete()
            res.status(200).json('Comment deleted')
        } else {
            res.status(403).json("not allowed son")
        }
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getPostComment = async (req, res) => {
    let results = [];
    let userd;
    try {
        const comments = await CommentModel.find()
        for (const doc of comments) {
            try {
                const { username, profilePicture, _id } = await UserModel.findById(doc.userId)
                userd = { username, profilePicture, _id }
                results.push({ ...doc._doc, user: userd });
            } catch (error) {
                console.log(error);
            }
        }
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const editComment = async (req, res) => {
    const id = req.params.id
    const { currentUserId, body } = req.body
    let comment = await CommentModel.findById(id)
    try {
        if (currentUserId === comment.userId) {
            await comment.updateOne({ $set: { body: body }, new: true })
            const userd = await UserModel.findById(comment.userId)
            const updatedComment = { ...comment._doc, user: userd }
            res.status(200).json("Edited")
        } else {
            res.status(403).json("Not Allowed")
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}