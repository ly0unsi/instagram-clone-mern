import mongoose from "mongoose";

const SharedPostSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        userDesc: {
            type: String
        },
        postOwnerId: {
            type: String,
            required: true
        },
        likes: [],
        trendIds: [],
    },
    {
        timestamps: true,
    }
)

var SharedPostModel = mongoose.model("sharedPosts", SharedPostSchema);
export default SharedPostModel;