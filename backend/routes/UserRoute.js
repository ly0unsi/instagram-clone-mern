import express from "express";
import { deleteUser, followUser, getFollowers, getFollowings, getUser, unfollowUser, updateUser } from "../controllers/UserController.js";

const UserRoute =express.Router()
UserRoute.get('/:id',getUser)
UserRoute.put('/update/:id',updateUser)
UserRoute.delete('/delete/:id',deleteUser)
UserRoute.put('/follow/:id',followUser)
UserRoute.put('/unfollow/:id',unfollowUser)
UserRoute.get('/getFollowers/:id',getFollowers)
UserRoute.get('/getFollowings/:id',getFollowings)
export default UserRoute