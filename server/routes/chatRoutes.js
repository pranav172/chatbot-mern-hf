import express from 'express';
import { processMessage } from '../controllers/chatController.js';
import protect from '../middleware/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

// Protect the chat endpoint - only logged-in users can access it
router.post('/', protect, processMessage);

export default router;