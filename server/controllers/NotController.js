import NotModel from "../models/NotificationModel.js"
import UserModel from "../models/UserModel.js"

export const getNotifs = async (req, res) => {
    const id = req.params.id
    try {
        let results = []
        let userd = {}
        let notifs = await NotModel.find({ receverId: id })
        for (const doc of notifs) {
            try {
                const { username, profilePicture } = await UserModel.findById(doc.senderId)
                userd = { username, profilePicture }
                results.push({ ...doc._doc, sender: userd });
            } catch (error) {
                console.log(error);
            }
        }
        results = results.sort((a, b) => {
            return b.createdAt - a.createdAt
        })
        res.status(200).json(results)

    } catch (error) {
        res.status(400).json(error.message)
    }

}
export const unreadedNots = async (req, res) => {
    const id = req.params.id
    try {
        const nots = await NotModel.find({ read: false, receverId: id }).count()
        res.status(200).json(nots)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const readNot = async (req, res) => {
    const id = req.params.id
    try {
        const nots = await NotModel.find({ receverId: id })
        for (const not of nots) {
            if (!not.read) {
                await NotModel.findOneAndUpdate({ _id: not._id }, { read: true }, { new: true })
            }
        }
        res.status(200).json(nots)
    } catch (error) {
        res.status(400).json(error.message)
    }

}