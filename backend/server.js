'use strict';

const socketIO = require('socket.io');
const { PORT } = require('./config/variables');



const users = {};

const hub = socketIO(PORT, {
  transports: ['websocket', 'polling'],
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

hub.on('connection', (client) => {
  console.log(`New client connected ${client.id}`);
  users[client.id] = client.id;
  client.broadcast.emit('to other clients', { user: users[client.id] });
  client.on('message', (payload) => {
    client.broadcast.emit('received', { user: users[client.id], message: payload.message });
    queue.push(payload.message);
  });
  client.on('disconnect', (payload) => {
    client.broadcast.emit('user_disconnected', { disconnt: `User has been disconnected ${client.id}` });
    delete users[client.id];
  });
});