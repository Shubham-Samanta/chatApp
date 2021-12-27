const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const PORT = process.env.PORT || 8000;
const socket = require('socket.io')
const io = socket(server,{cors: {
     origin: "*",
     methods: ["GET", "POST"]
   }})

io.on("connection", (socket) => {
     socket.emit("your id", socket.id)
     socket.on('send message', (body) => {
          io.emit("message",body)
     })
})


if (process.env.NODE_ENV == 'production')
{
     app.use(express.static("frontend/build"))
     }
server.listen(PORT, () => {
     console.log(`running on port ${PORT}` )
})