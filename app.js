const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes'); 
const path = require('path'); // Import path module for file paths
const http = require('http'); // Import http module for creating server

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Serve static files from the "views" folder
app.use(express.static(path.join(__dirname, 'views')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// Serve static files from the "js" directory
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://f219061:SOmbBw4iqq4Eq89X@fitfusioncluster.jamdgd4.mongodb.net/');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});






// Define routes
app.use(routes);

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
