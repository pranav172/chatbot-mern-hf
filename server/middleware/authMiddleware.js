import { verifyToken } from '../utils/jwtUtils.js';
import User from '../models/User.js'; // Assuming you might want to fetch the user

const protect = async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            // Get token from header
            token = authHeader.split(' ')[1];

            // Verify token
            const decoded = verifyToken(token);

            if (!decoded) {
                 res.status(401);
                 throw new Error('Not authorized, token failed');
            }

            // Optional: Get user from the token payload and attach to request
            // This makes the user data available in subsequent controllers
            // Make sure not to select the password
            req.user = await User.findById(decoded.id).select('-password');

             if (!req.user) {
                 res.status(401);
                 throw new Error('Not authorized, user not found');
             }

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            console.error('Auth Middleware Error:', error);
            res.status(401);
            // Throw error to be caught by the global error handler
            next(new Error('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(401);
        // Throw error to be caught by the global error handler
        next(new Error('Not authorized, no token'));
    }
};

export default protect;