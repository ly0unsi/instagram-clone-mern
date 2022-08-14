import mongoose from "mongoose";
import UserModel from "./UserModel.js";

const NotSchema = mongoose.Schema(
    {
        receverId:{
            type:String,
            required:true
        },
        type:{
            type:Number,
            required:true
        },
        read:{
            type:Boolean,
            required:true
        }
    }
)
var NotModel = mongoose.model("notifications", NotSchema);
export default NotModel;