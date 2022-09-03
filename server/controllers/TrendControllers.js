import mongoose from "mongoose"
import PostModel from "../models/PostModel.js"
import TrendModel from "../models/Trend.js"
import UserModel from "../models/UserModel.js"

export const getTrends = async (req, res) => {
    try {
        const trends = await TrendModel.find().sort({ "postIds": -1 })
        var trendsWithPosts = []
        for (const trend of trends) {
            const trendWithPost = await TrendModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(trend._id)
                    }
                },

                {

                    $lookup: {
                        from: "posts",
                        localField: "postIds",
                        foreignField: "_id",
                        as: "trendPosts"
                    }
                },
                {
                    $addFields: {
                        trendPosts: { $size: "$trendPosts" },

                    }
                }


            ])
            trendsWithPosts.push(trendWithPost[0])
        }
        res.status(200).json(trendsWithPosts.sort((a, b) => {
            return b.trendPosts - a.trendPosts
        }))
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getTrendPosts = async (req, res) => {
    const { trendId } = req.params
    try {

        const posts = await TrendModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(trendId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "postIds",
                    foreignField: "_id",
                    as: "trendPosts"
                }
            },
            {
                $project: {
                    trendPosts: 1,
                    _id: 0
                }
            }

        ])
        let results = []
        let userd = {}
        for (const doc of posts[0].trendPosts) {
            try {
                const { username, profilePicture, followers, following, _id } = await UserModel.findById(doc.userId)
                userd = { username, profilePicture, followers, following, _id }
                results.push({ ...doc, user: userd });
            } catch (error) {
                res.status(400).json(error.message)
            }
        }
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json(error.message)
    }

}