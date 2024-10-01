// src/db.js

const mysql = require('mysql');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection to the MySQL database
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,       // Use environment variable for username
    password: process.env.DB_PASSWORD, // Use environment variable for password
    database: process.env.DB_NAME,      // Use environment variable for database name
    port: process.env.DB_PORT           // Specify the custom port here
});

// Connect to the database
dbConnection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Export the connection object for use in other modules
module.exports = dbConnection;