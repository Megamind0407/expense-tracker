const express = require('express');
const cors = require('cors');
const { db } = require('./db/db'); // Database connection
const { readdirSync } = require('fs');
const path = require('path');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' || process.env.FRONTEND_URL, // Allow requests from localhost:3000
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Dynamically load routes from the routes directory
const routesDirectory = path.join(__dirname, 'routes'); // Correct directory path
readdirSync(routesDirectory).forEach((routeFile) => {
    const routePath = path.join(routesDirectory, routeFile);
    app.use('/api/v1', require(routePath)); // Dynamically require the route file
});

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    db();
});
