import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test the database connection
db.getConnection((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('Connected to the database.');
    }
});

process.on('SIGINT', () => {
    db.end((err) => {
        if (err) {
            console.error(
                'Error closing the database connection:',
                err.message
            );
        } else {
            console.log('Database connection closed.');
        }
        process.exit(0);
    });
});

export default db;
