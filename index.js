const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); // For handling file paths
const PORT = process.env.PORT || 8000;

// Set the current working directory
const __path = process.cwd();

// Import custom route handlers (assuming they exist)
let server = require('./qr');
let code = require('./pair');

// Increase max listeners to avoid warnings
require('events').EventEmitter.defaultMaxListeners = 500;

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if you have CSS, JS, or images)
app.use(express.static(path.join(__path, 'public')));

// Routes for custom modules
app.use('/server', server);
app.use('/code', code);

// Routes to serve HTML files
app.get('/pair', (req, res) => {
    res.sendFile(path.join(__path, 'pair.html'));
});

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__path, 'qr.html'));
});

app.get('/session', (req, res) => {
    res.sendFile(path.join(__path, 'session.html'));
});

app.get('/deploy', (req, res) => {
    res.sendFile(path.join(__path, 'deploy.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__path, 'main.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`
Don't Forget To Give Star

Server running on http://localhost:${PORT}`);
});

module.exports = app;
