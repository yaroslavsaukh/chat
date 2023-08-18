const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')

const userName = prompt('Enter your name:')
// const roomName = prompt('Enter room name:')

nameBlock.innerHTML = `${userName}`
let roomId = ''

async function allChats() {
    const chats = await fetch('http://localhost:5000/chats/all-rooms')
    if (chats.ok) {
        return chats.json();
    } else {
        alert(`error ${chats.status}`);
    }
}

async function getChat(id) {
    socket.emit('joinRoom', id);
    roomId = id
}

socket.on('joinRoom', () => {
    let parent = document.querySelector('.messages')
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (input.value) {
        socket.emit('chat_message', {message: input.value, name: userName, room: roomId})
        input.value = ''
    }
})

socket.on('chat_message', (data) => {
    const item = document.createElement('li')
    item.innerHTML = `<span>${data.name}</span>: ${data.message}`
    messages.appendChild(item)
})

async function showChats() {
    const chats = await allChats()
    const parent = document.querySelector('.chat-list-all')
    for (let i = 0; i < chats.length; i++) {
        const item = document.createElement('div')
        item.classList.add('chat-item')
        item.innerHTML = `<span class="chat-item-name" id="${chats[i]._id}">${chats[i].name}</span>`
        parent.appendChild(item)
        item.addEventListener("click", function () {
            let active = document.querySelector('.chat-item.active')
            if (active) {
                active.classList.remove('active')
            }
            item.classList.add('active')
            console.log(this.children[0].id)
            getChat(this.children[0].id)
        })
    }
}

showChats()