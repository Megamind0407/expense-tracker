const express = require('express');
const cors = require('cors');
const { db } = require('./db/db'); // Database connection
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
    // Set this based on where your frontend will be deployed
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Update with frontend URL for deployment
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Routes - Dynamically load routes from the 'routes' folder
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server and connect to the database
const server = () => {
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    });
    
    // Database connection (ensure it is connected when server starts)
    db();
};

server();
