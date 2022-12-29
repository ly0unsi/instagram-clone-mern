
import ChatModel from "../models/ChatModel.js";
import MessageModel from "../models/MessageModel.js";

export const createChat = async (req, res) => {
    const newChat = new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
    });
    try {
        const result = await newChat.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const userChats = async (req, res) => {
    try {
        const chats = await ChatModel.find({
            members: { $in: [req.params.userId] },
        });
        const chatsWLatestMessage = []
        for (const chat of chats) {
            const chatMessage = await MessageModel.find({ chatId: chat._id }).sort({ _id: -1 }).limit(1)
            const messagesCount = await MessageModel.find({ seen: false, chatId: chat._id, senderId: { $ne: req.params.userId } }).find().count()
            const chatWMessages = { ...chat._doc, message: chatMessage[0], msgCount: messagesCount }
            chatsWLatestMessage.push(chatWMessages)
        }
        res.status(200).json(chatsWLatestMessage);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const findChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
};