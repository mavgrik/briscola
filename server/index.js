const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')

const PORT = 666

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`User connected => ${socket.id}`)

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined the room => ${room}`)
    })

    socket.on("send_message", (messageData) => {
        console.log(messageData)
        socket.to(messageData.room).emit("receive_message", messageData)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected => ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}\n`)
})