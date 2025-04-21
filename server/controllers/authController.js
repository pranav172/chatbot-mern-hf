import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    // Inside registerUser function
    const { name, email, password } = req.body; // Destructure name

    try {
        if (!name || !email || !password) { // Check for name
            res.status(400);
            throw new Error('Please add all fields (name, email, password)');
        }

        // Check if user exists (remains the same)
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password (remains the same)
        const hashedPassword = await hashPassword(password);

        // Create user (include name)
        const user = await User.create({
            name, // Add name here
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name, // Return name
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Authenticate a user (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400);
            throw new Error('Please provide email and password');
        }

        // Check for user email, explicitly selecting password
        const user = await User.findOne({ email }).select('+password');

        // Check if user exists and password matches
        if (user && (await comparePassword(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name, // Return name
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401); // Unauthorized
            throw new Error('Invalid credentials');
        }
    } catch (error) {
        next(error); // Pass error to the error handler middleware
    }
};

// @desc    Get user data (Example of a protected route)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
    // User data is attached to req.user by the protect middleware
    try {
        // If protect middleware succeeded, req.user should exist
        if (!req.user) {
             res.status(404); // Should have been caught by middleware, but double-check
             throw new Error('User not found');
        }
         // Send back user data (excluding password, which was already excluded in middleware)
        // Inside getMe function
        res.status(200).json({
            _id: req.user.id,
            name: req.user.name, // Add name here
            email: req.user.email,
            createdAt: req.user.createdAt
        });
    } catch (error) {
        next(error);
    }
};


export { registerUser, loginUser, getMe };