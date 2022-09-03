import mongoose from "mongoose";

const TrendSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        postIds: []
    },
    { timestamps: true }
)

const TrendModel = mongoose.model("Trends", TrendSchema);
export default TrendModel