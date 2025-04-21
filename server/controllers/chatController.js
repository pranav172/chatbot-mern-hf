import callHuggingFaceApi from '../services/huggingfaceService.js';

// @desc    Process a chat message
// @route   POST /api/chat
// @access  Private (Requires user to be logged in)
const processMessage = async (req, res, next) => {
    const { message } = req.body;
    // Assuming user info is attached by auth middleware `req.user`

    try {
        if (!message) {
            res.status(400);
            throw new Error('Message content is required');
        }

        // You could add user context here if needed for the HF model
        // const userContext = `User ID: ${req.user.id}`;
        // const fullInput = `${userContext}\nMessage: ${message}`;
        const fullInput = message; // Keep it simple for now

        const reply = await callHuggingFaceApi(fullInput);

        res.status(200).json({ reply });

    } catch (error) {
        // Log the specific error from the service if available
        console.error(`Chat Controller Error: ${error.message}`);
        // Pass a potentially more user-friendly error to the global handler
        next(new Error(error.message || 'Failed to process chat message'));
    }
};

export { processMessage };