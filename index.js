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
app.get('/javascript', (req, res) =>{
    res.sendFile(__dirname + '/public/Javascript.html')
});
app.get('/swift', (req, res) =>{
    res.sendFile(__dirname + '/public/Swift.html')
});
app.get('/python', (req, res) =>{
    res.sendFile(__dirname + '/public/Python.html')
});



//tech namespace
const tech = io.of('/tech');


tech.on('connection', (socket) =>{
    console.log('user connected');
    socket.on('join', (data) =>{
        socket.join(data.room);

    })
    socket.on('message', (data) => {
        console.log('message: ' + data.msg)
        tech.in(data.room).emit('message', data.msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
        tech.emit('message', 'user disconnected')
    })
})
//tech namespace
