const express = require('express');
const path = require('path');
const http = require("http");
const socketio = require("socket.io");
const messageObject = require('./utils/messages');
const {joinUser, findUser, removeUser, getUsersByRoom} = require('./utils/users');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const PORT = 3000 || process.env.PORT;
const io = socketio(server)
const botName = "VinChat Bot";
io.on('connection', socket=>{
    console.log('New WS Connection');
    socket.on('joinRoom', (passedObj)=>{
        let idUser = socket.id;
        let nameUser = passedObj.username;
        let roomUser = passedObj.room;
        joinUser(idUser, nameUser, roomUser);
        socket.join(roomUser);
        socket.emit("message", messageObject(botName, "Welcome to the Chat Room!"));
        socket.to(roomUser).emit('message', messageObject(botName, `${nameUser} has joined the chat`));
        io.to(roomUser).emit('userArr', getUsersByRoom(roomUser));
    })
    socket.on('disconnect', ()=>{
        let disconnected_user = findUser(socket.id);
        io.to(disconnected_user.roomName).emit('message', messageObject(botName, `${disconnected_user.userName} has left the chat`));
        removeUser(disconnected_user.id);
    })
    socket.on("msg_from_user", msg=>{
        let sender_user = findUser(socket.id);
        io.to(sender_user.roomName).emit('message', messageObject(sender_user.userName, msg));
})
})
server.listen(PORT, ()=>console.log(`Server Running On Port ${PORT}`));