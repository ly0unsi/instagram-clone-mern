import express from "express";
import { deleteUser, followUser, getAllUsers, getFollowers, getFollowings, getUser, updateUser } from "../controllers/UserController.js";

const UserRoute =express.Router()
UserRoute.get('/:username',getUser)
UserRoute.put('/update/:id',updateUser)
UserRoute.delete('/delete/:id',deleteUser)
UserRoute.put('/follow/:id',followUser)
UserRoute.get('/getFollowers/:id',getFollowers)
UserRoute.get('/getFollowings/:id',getFollowings)
UserRoute.get('/',getAllUsers)
export default UserRoute