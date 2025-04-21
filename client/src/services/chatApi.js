import apiClient from './apiClient';

const sendMessage = async (message) => {
    try {
        // The token is added automatically by the axios interceptor
        const response = await apiClient.post('/chat', { message });
        return response.data; // { reply: "chatbot response" }
    } catch (error) {
        console.error('Chat API error:', error);
        // The error should already be processed by the interceptor
        // If it's the specific "Model is loading" error, pass it cleanly
        if (error.message && error.message.includes("Model is currently loading")) {
             throw new Error("Model is loading, please wait and try again.");
        }
        // Otherwise, re-throw the processed error
        throw error;
    }
};

const chatApi = {
    sendMessage,
};

export default chatApi;