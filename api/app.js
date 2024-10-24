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
    origin: 'http://localhost:3000' || process.env.FRONTEND_URL, // Allow requests from localhost:3000
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

// Dynamically load routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server and connect to the database
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    db();
});
