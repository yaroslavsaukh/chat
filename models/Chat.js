
const mongoose = require('mongoose')

const Chat = new mongoose.Schema({
    name: {type: String},
    created: {type: Date}
})

module.exports = new mongoose.model('Chat', Chat)