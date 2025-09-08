import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Add the port from .env
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit if the connection fails
    } else {
        console.log('Connected to the database.');
    }
});

export default db;