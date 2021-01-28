const { response } = require('express');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/swift', (req, res) =>{
    res.sendFile(__dirname + '/public/Swift.html')
});
app.get('/Presentation1.jpg', (req, res) =>{
    res.sendFile(__dirname + '/public/Presentation1.jpg')
})
app.get('/favicon.png', (req, res) =>{
    res.sendFile(__dirname + '/public/favicon.png')
})



//tech namespace
const tech = io.of('/tech');


tech.on('connection', (socket) =>{
    console.log('user connected');
    socket.on('join', (data) =>{
        socket.join(data.room);
        tech.emit('message', `new user joined the ${data.room} room`);
    })
    socket.on('message', (data) => {
        console.log('message: ' + data.msg)
        tech.in(data.room).emit('message', data.msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
        tech.emit('message', 'user disconnected')
    })
    socket.on('allmes', (msg) => {
        console.log(`message: ${msg}`)
        tech.emit('message', `message to entire tech namespace: ${msg}`)
    })
})
//tech namespace
