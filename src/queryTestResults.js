// src/testConnection.js

const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT // Ensure this points to 3308
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL Server');
    dbConnection.end();
});