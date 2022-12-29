import { addComment, deleteComment, editComment, getPostComment } from "../controllers/ComentController.js"
import express from 'express'
const CommentRoute=express.Router()
CommentRoute.post('/add',addComment)
CommentRoute.delete('/delete/:id',deleteComment)
CommentRoute.get('/postComments',getPostComment)
CommentRoute.put('/edit/:id',editComment)
export default CommentRoute