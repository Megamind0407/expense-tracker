const express = require('express');
const cors = require('cors');
const { db } = require('./db/db'); // Database connection
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this based on your frontend URL
    allowedHeaders: ['Authorization', 'Content-Type']
}));

//routes - dynamically loading routes from the routes folder
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server and connect to the database
const server = () => {
    app.listen(PORT, () => {
        console.log('Listening to port:', PORT);
    });
    db();
};

server();
