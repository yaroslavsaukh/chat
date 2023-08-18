// import Chat from "../models/Chat";

const Chat = require('../models/Chat')

class ChatController {
    async createRoom(req, res) {
        try {
            console.log(Object.keys(req))
            const name = req.body.name
            const date = new Date()
            const room = await Chat.create({name: name, created: date})
            // await room.save()
            res.json(room)
        } catch (e) {
            res.json(e)
        }
    }

    async getAll(req, res) {
        try {
            const rooms = await Chat.find()
            res.json(rooms)
        } catch (e) {
            res.json(e)
        }
    }

    async getOne(req, res) {
        try {
            const room = await Chat.findOne({_id:req.query.id})
            res.json(room)
        } catch (e) {
            res.json(e)
        }
    }
}

module.exports.ChatController = new ChatController()