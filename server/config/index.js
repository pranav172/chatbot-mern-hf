// server/config/index.js

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config(); // Make sure dotenv is installed (npm install dotenv)

// Export the variables
export default {
    port: process.env.PORT || 5001,
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    hfApiKey: process.env.HF_API_KEY,
    hfInferenceApiUrl: process.env.HF_INFERENCE_API_URL,
};