import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // Import the protect middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe); // Protect the 'me' route

export default router;