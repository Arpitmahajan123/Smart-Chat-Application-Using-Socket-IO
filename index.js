import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Socket } from 'engine.io';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



// Run When Connection Is Established . . . . .

io.on('connection', (socket) => {
  console.log('A user connected');  
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('chat message', msg);
    }); 
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});





app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

