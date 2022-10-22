import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        receiverId: {
            type: String,
        },
        text: {
            type: String,
        },
        seen: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel