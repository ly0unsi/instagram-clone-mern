import mongoose from "mongoose";
import UserModel from "./UserModel.js";

const commmentSchema = mongoose.Schema(
    {
        postId:{
            type:String,
            required:true
        },
        userId:{
            type:String,
            required:true
        },
        body:{
            type:String,
            required:true
        },
    
    },
    {
        timestamps: true,
    }

)
var PostModel = mongoose.model("Comments", commmentSchema);
export default PostModel;