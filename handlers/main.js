const chat = require("../models/Chat");
const message = require("../models/Message");
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('joinRoom', async (room) => {
            socket.join(room);
            console.log(`User joined room: ${room}`);
            io.to(room).emit('joinRoom')
            let get_messages = await getMessages(room)
            // console.log(get_messages)
            for (let message of get_messages) {
                io.to(room).emit('chat_message', {
                    message: message.text,
                    name: message.author
                });
            }
        });
        socket.on('chat_message', (data) => {
            io.to(data.room).emit('chat_message', {
                message: data.message,
                name: data.name
            });
            saveMessage(data)
        });
    })

    async function saveMessage(data) {
        const message_chat = await chat.findOne({_id: data.room})
        await message.create({text: data.message, chat: message_chat.name, date: new Date(), author: data.name})
    }

    async function getMessages(room) {
        const message_chat = await chat.findOne({_id: room})
        const messages = await message.find({chat: {$eq: message_chat.name}}).sort({date: 1})
        // console.log(messages)
        return messages
    }

}