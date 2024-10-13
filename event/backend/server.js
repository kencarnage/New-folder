// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http'); // Import http module
const { Server } = require('socket.io'); // Import socket.io

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Example API route
app.get('/', (req, res) => {
  res.send('Hello World from Event Management API');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

// Create HTTP server (this allows you to use socket.io)
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (you can restrict this to your frontend URL)
    methods: ['GET', 'POST'], // Allowed methods
  },
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Example: Listening for a message from a client
  socket.on('sendMessage', (message) => {
    console.log('Message received from client:', message);

    // Example: Broadcasting the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server on the defined port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
