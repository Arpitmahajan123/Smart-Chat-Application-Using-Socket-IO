const io = require('socket.io')(5000)



const users = {};


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log(`${name} joined the chat`);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });




});
