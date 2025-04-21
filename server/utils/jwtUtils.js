import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const generateToken = (userId) => {
    if (!config.jwtSecret) {
        throw new Error('JWT_SECRET is not defined.');
    }
    return jwt.sign({ id: userId }, config.jwtSecret, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

export const verifyToken = (token) => {
     if (!config.jwtSecret) {
        throw new Error('JWT_SECRET is not defined.');
    }
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null; // Return null if token is invalid or expired
    }
};