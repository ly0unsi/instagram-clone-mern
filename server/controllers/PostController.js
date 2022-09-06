import mongoose from "mongoose"
import PostModel from "../models/PostModel.js"
import UserModel from "../models/UserModel.js"
import CommentModel from "../models/CommentModel.js"
import cloudinary from "../Utils/Cloudinary.js"
import NotModel from "../models/NotificationModel.js"
import NotsRoute from "../routes/NotsRoute.js"
import TrendModel from "../models/Trend.js"
export const addPost = async (req, res) => {
    const { userId, desc, image, user, hashtags } = req.body
    const trendIds = []
    var newPost = new PostModel({ userId, desc, user, trendIds })
    try {
        if (image) {

            const result = await cloudinary.uploader.upload(image,
                {
                    folder: "posts",
                }
            )
            newPost.image = result.secure_url

        }

        newPost = await newPost.save()
        if (hashtags) {
            for (const hashtag of hashtags) {
                const trend = await TrendModel.findOne({ name: hashtag })
                if (trend) {
                    trendIds.push(trend._id)
                    await trend.updateOne({ $push: { postIds: newPost._id } });
                } else {
                    var newTrend = new TrendModel({ name: hashtag, postIds: [newPost._id] })
                    newTrend = await newTrend.save()
                    trendIds.push(newTrend._id)
                }

            }
            for (const trendId of trendIds) {
                await newPost.updateOne({ $push: { trendIds: trendId } });
            }
        }



        res.status(200).json({ msg: "post created", post: newPost })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { userId, image, desc } = req.body
    try {
        const post = await PostModel.findById(postId)

        if (userId === post.userId) {
            if (image) {

                const result = await cloudinary.uploader.upload(image,
                    {
                        folder: "posts",
                    }
                )
                post.image = result.secure_url
                await post.updateOne({ $set: { image: result.secure_url, desc: desc }, new: true })

            } else {

                await post.updateOne({ $set: { desc: desc }, new: true })
            }

            post.desc = desc
            res.status(200).json(post)
        } else {
            res.status(403).json("Action forbidden Son!!")
        }

    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        await CommentModel.deleteMany({ "postId": post._id })

        if (userId === post.userId) {
            const trends = await TrendModel.find()
            for (var trend of trends) {
                for (var trendPostId of trend.postIds) {

                    if (trendPostId.equals(post._id)) {
                        trend = await trend.updateOne({ $pull: { postIds: post._id } });
                        if (!trend.postIds) {
                            console.log("trend deleted");
                            await TrendModel.deleteOne(trend)
                        }
                    }
                }

            }
            await PostModel.deleteOne(post)

            res.status(200).json("Post deleted Son!!")
        } else {
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
            const receverId = post.userId
            if (userId !== receverId) {
                await new NotModel({ receverId, senderId: userId, type: 1, read: false, postId: post._id }).save()
            }

            res.status(200).json("Post liked");
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {
        const userPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }

        ])

        let userd = {};
        let posts = userPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt
        })
        let results = [];
        for (const doc of posts) {
            try {
                const { username, profilePicture, followers, following, _id } = await UserModel.findById(doc.userId)
                userd = { username, profilePicture, followers, following, _id }
                if (doc.userId === userId) results.push({ ...doc._doc, user: userd }); else results.push({ ...doc, user: userd });
            } catch (error) {
                res.status(400).json(error.message)
            }
        }


        res.status(200).json(results)

    } catch (error) {
        res.status(400).json(error.message)
    }


}
