import UserModel from "../models/UserModel.js";
import cloudinary from "../Utils/Cloudinary.js";

//get a user
export const getUser = async (req, res) => {
    const username = req.params.username
    try {
        const user = await UserModel.find({ username: username })

        if (user) {
            const { password, ...others } = user
            res.status(200).json(others[0])
        } else {
            res.status(404).json("No user Found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getUserById = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await UserModel.find({ _id: userId })

        if (user) {
            const { password, ...others } = user
            res.status(200).json(others[0])
        } else {
            res.status(404).json("No user Found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus, password, profilePicture, coverPicture } = req.body
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            let user = null
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt(password, salt)
            }

            let result1, result2 = null
            if (profilePicture) {
                result1 = await cloudinary.uploader.upload(profilePicture,
                    {
                        folder: "users",
                    }
                )
                req.body = { ...req.body, profilePicture: result1.secure_url }
            }
            if (coverPicture) {
                result2 = await cloudinary.uploader.upload(coverPicture,
                    {
                        folder: "users",
                    }
                )
                req.body = { ...req.body, coverPicture: result2.secure_url }
            }
            user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })



            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error.message)
        }
    } else {
        res.status(403).json("Access denied Son!!")
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId, currentUserAdminStatus } = req.body
    if (id === currentUserId || currentUserAdminStatus) {
        try {
            const user = await UserModel.findByIdAndDelete(id)
            res.status(200).json("user deleted suucesfully")
        } catch (error) {
            res.status(500).json(error)
        }

    } else {
        res.status(403).json("Access denied Son!!")
    }
}

export const followUser = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body
    if (currentUserId === id) {
        res.status(403).json("Access denied Son!!")
    } else {
        try {
            const followUser = await UserModel.findById(id)
            const followinguser = await UserModel.findById(currentUserId)
            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $push: { followers: currentUserId } })
                await followinguser.updateOne({ $push: { following: id } })
                res.status(200).json('User followed')
            } else if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({ $pull: { followers: currentUserId } })
                await followinguser.updateOne({ $pull: { following: id } })
                res.status(200).json('User unfollowed')
            }
        } catch (error) {
            res.status(400).json(error.message)
        }
    }

}

export const getFollowers = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    try {
        let folowers = await UserModel.find().where('_id').in(user.followers).exec();
        folowers = folowers.map((follower) => {
            const { password, ...other } = follower._doc
            return other
        })
        res.status(200).json(folowers)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const getFollowings = async (req, res) => {
    const id = req.params.id
    const user = await UserModel.findById(id)
    try {
        let followings = await UserModel.find().where('_id').in(user.following).exec();
        followings = folowers.map((following) => {
            const { password, ...other } = following._doc
            return other
        })
        res.status(200).json(followings)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModel.find()
        users = users.map((user) => {
            const { password, ...others } = user._doc
            return others;
        })

        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error.message)
    }

}