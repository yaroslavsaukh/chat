const Router = require('express').Router()
// const path = require('../index.html')
const Controller = require('../controllers/chatController')


Router.post('/add-room', Controller.ChatController.createRoom)
Router.get('/all-rooms', Controller.ChatController.getAll)
Router.get('/room', Controller.ChatController.getOne)
Router.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})
module.exports = Router
