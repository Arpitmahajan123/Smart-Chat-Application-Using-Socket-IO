const socket = io('http://localhost:8000');

// DOM Elements
const form = document.getElementById('send-message');
const messageInput = document.getElementById('messageinput');
const messageContainer = document.querySelector('.container');

// Prompt for name
const userName = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', userName);



