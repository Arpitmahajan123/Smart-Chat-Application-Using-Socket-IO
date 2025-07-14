const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
    console.log('a new connection')
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('user-disconnected', users[socket.id])
            delete users[socket.id]
        }
    })
    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        })
    })
    socket.on('send-private-message', ({ message, to }) => {
        const recipientSocketId = Object.keys(users).find(id => users[id] === to)
        if (recipientSocketId) {
            socket.to(recipientSocketId).emit('private-message', {
                message: message,
                name: users[socket.id]
            })
        }
    })
    socket.on('typing', () => {
        socket.broadcast.emit('typing', users[socket.id])
    })
    socket.on('stop-typing', () => {
        socket.broadcast.emit('stop-typing', users[socket.id])
    })
    socket.on('join-room', room => {
        socket.join(room)
        socket.to(room).emit('user-joined', users[socket.id])
    })  
    socket.on('leave-room', room => {
        socket.leave(room)
        socket.to(room).emit('user-left', users[socket.id])
    })

    socket.on('send-room-message', ({ message, room }) => {
        socket.to(room).emit('room-message', {
            message: message,
            name: users[socket.id]
        })
    }
    )
    socket.on('send-room-private-message', ({ message, to, room }) => {
        const recipientSocketId = Object.keys(users).find(id => users[id] === to)
        if (recipientSocketId) {










            