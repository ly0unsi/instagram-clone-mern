import MessageModel from "../models/MessageModel.js";

export const addMessage = async (req, res) => {
    const { chatId, senderId, text, seen, receiverId } = req.body;
    const message = new MessageModel({
        chatId,
        senderId,
        text,
        seen,
        receiverId
    });
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const result = await MessageModel.find({ chatId });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
};


export const readMessage = async (req, res) => {
    const chatId = req.params.chatId
    try {
        const ChatMessages = await MessageModel.find({ chatId: chatId })
        for (const msg of ChatMessages) {
            if (!msg.seen) await MessageModel.findOneAndUpdate({ _id: msg._id }, { seen: true }, { new: true })
        }
        res.status(200).json(ChatMessages)
    } catch (error) {
        res.status(500).json(error.message);
    }
}
export const getUserMessages = async (req, res) => {
    const userId = req.params.userId
    try {
        const userMessages = await MessageModel.find({ receiverId: userId, seen: false }).count()
        res.status(200).json(userMessages)
    } catch (error) {
        res.status(500).json(error.message);
    }
}