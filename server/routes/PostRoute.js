import express from 'express'
import { addPost, getPost, getTimelinePosts, likePost, updatePost } from '../controllers/PostController.js'

const postRoute=express.Router()
postRoute.get('/:id',getPost)
postRoute.post('/add',addPost)
postRoute.put('/update/:id',updatePost)
postRoute.put('/like/:id',likePost)
postRoute.get('/timelinePosts/:id',getTimelinePosts)
 export default postRoute