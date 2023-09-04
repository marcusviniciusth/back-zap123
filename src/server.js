const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 4000;


const users = [];

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log('Um usuário saiu do chat');
  })

  socket.on("join", (userName) => {
    const user = { id: socket.id, userName};
    users.push(user);
    io.emit("users", users);
  })

  socket.on("message", (message) => {
    message.userID = socket.id;
    io.emit("message", message);
  })
})

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));