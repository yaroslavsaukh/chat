const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')
const morgan = require('morgan')
const chatsRouter = require('./routers/chatsRouter')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(express.static('assets'))
app.use(morgan("combined"))
app.use('/chats', chatsRouter)
require('./handlers/main')(io)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        http.listen(PORT, () => console.log('Server started on port ' + PORT));

    } catch (e) {
        console.log(e);
    }
}

startApp()
