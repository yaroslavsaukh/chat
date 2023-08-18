// import mongoose from "mongoose";
const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    text: {type: String},
    author: {type: String},
    chat: {type: String, ref: 'Chat'},
    date: {type: Date}
})

module.exports = new mongoose.model('Message', Message)
// export default mongoose.model('Message', Message)