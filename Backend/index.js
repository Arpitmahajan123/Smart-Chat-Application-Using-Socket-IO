const io = require('socket.io')(8000);
const users = {};


io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        console.log("User Name Of New Joined user Is :", name);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });


});
