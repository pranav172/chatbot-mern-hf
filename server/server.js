// Use ES module syntax (add "type": "module" in package.json or use .mjs extension)
// Make sure you have added "type": "module" to your server/package.json
import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON data
app.use(express.urlencoded({ extended: false })); // Body parser for URL-encoded data

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// Simple Root Route (Optional)
app.get('/', (req, res) => {
    res.send('API is running...');
});


// Global Error Handler Middleware (should be last middleware)
app.use(errorHandler);


const PORT = config.port;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));