
import SharedPostModel from "../models/SharedPostModel.js"
import TrendModel from "../models/Trend.js"

export const create = async (req, res) => {
    const { postId, userId, userDesc, hashtags, postOwnerId } = req.body
    try {
        const newPost = await new SharedPostModel({ postId, userId, userDesc, postOwnerId }).save()
        if (hashtags) {
            const trendIds = []
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
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error.message)
    }

}