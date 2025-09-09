import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import formRoutes from './routes/form.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN })); // Restrict CORS to specific origins
app.use(helmet()); // Add security headers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forms', formRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the role-based access application.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
