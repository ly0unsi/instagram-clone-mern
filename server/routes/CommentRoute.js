import { addComment, deleteComment, getPostComment } from "../controllers/ComentController.js"
import express from 'express'
const CommentRoute=express.Router()
CommentRoute.post('/add',addComment)
CommentRoute.delete('/delete/:id',deleteComment)
CommentRoute.get('/postComments/:id',getPostComment)
export default CommentRoute