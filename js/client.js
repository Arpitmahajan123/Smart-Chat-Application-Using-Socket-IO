const socket = io('http://localhost:8000');

const form = document.getElementById('send-message');
const messageInput = document.getElementById('messageinput');
const messageContainer = document.querySelector('.container');

const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', name);
































