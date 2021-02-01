const { response } = require('express');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 5500;
const user = {};

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/swift', (req, res) =>{
    res.sendFile(__dirname + '/public/Swift.html');
});
app.get('/Presentation1.jpg', (req, res) =>{
    res.sendFile(__dirname + '/public/Presentation1.jpg');
})
app.get('/favicon.ico', (req, res) =>{
    res.sendFile(__dirname + '/public/favicon.ico');
})
app.get('/user_guide', (req, res) => {
    res.sendFile(__dirname + '/Presentation1.pdf');
})
app.get('/sound', (req, res) => {
    res.sendFile(__dirname + '/public/ting.mp3');
})
app.get('/background', (req, res) => {
    res.sendFile(__dirname + '/public/Background.png');
})

//tech namespace
const tech = io.of('/tech');


tech.on('connection', (socket) =>{
    console.log('user connected');
    socket.on('join', (data) =>{
        socket.join(data.room); 
        user[socket.id] = data.name;
        tech.in(data.room).emit('recieve', `new user joined ${data.room}`)
    })
    socket.on('send', (data) => {
        console.log('message: ' + data.msg);
        tech.in(data.room).emit('recieve', data.msg);
    })
    socket.on('disconnect', (room) => {
        console.log('user disconnected');
        tech.in(room).emit('recieve', 'user disconnected')
    })
    socket.on('allmes', (msg) => {
        console.log(`message: ${msg}`)
        tech.emit('recieve', `message to entire tech namespace: ${msg}`)
    })
})
//tech namespace
