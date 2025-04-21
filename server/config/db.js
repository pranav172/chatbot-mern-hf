import mongoose from 'mongoose';
import config from './index.js';

const connectDB = async () => {
    try {
        if (!config.mongoURI) {
            throw new Error('MONGO_URI not defined in environment variables.');
        }
        const conn = await mongoose.connect(config.mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;