import axios from 'axios';
import config from '../config/index.js';

const callHuggingFaceApi = async (inputText) => {
    if (!config.hfInferenceApiUrl || !config.hfApiKey) {
        console.error("Hugging Face API URL or Key not configured.");
        throw new Error("Chat service configuration error.");
    }

    try {
        console.log(`Sending to HF: ${inputText}`); // Log input
        // --- Payload Structure Varies by Model ---
        // Example for conversational models like DialoGPT:

        // Inside callHuggingFaceApi, before creating the payload
        
        const payload = {
            inputs: inputText,
            parameters: {
                max_new_tokens: 100, // Limit generated tokens (adjust as needed)
                // temperature: 0.7, // Optional: controls randomness (lower is more focused)
                // repetition_penalty: 1.1 // Optional: discourages repeating words
            }
             // Optional parameters (check model docs)
            // parameters: {
            //   max_length: 50,
            //   num_return_sequences: 1
            // }
        };

        // Example for Question Answering:
        // const payload = {
        //   inputs: {
        //      question: inputText,
        //      context: "Your context string here..." // QA models often need context
        //    }
        // };
        // --- Adjust payload based on your chosen model's documentation ---

        const response = await axios.post(
            config.hfInferenceApiUrl,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${config.hfApiKey}`,
                    'Content-Type': 'application/json',
                },
                // Add a timeout
                 timeout: 30000 // 30 seconds timeout
            }
        );

        console.log("Received from HF:", response.data); // Log HF response

        
        let reply = "Sorry, I couldn't generate a response."; // Default message

        // Check if the response is an array and has the expected structure
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0]?.generated_text) {
            reply = response.data[0].generated_text;
        }
        // Optional: Add fallback for non-array structure if needed for other models
        else if (response.data?.generated_text) {
            reply = response.data.generated_text;
        }

        console.log("Parsed Reply:", reply); // Add this log to confirm extraction
        // --- End Response Parsing ---

        return reply; // Make sure the return is outside the parsing block

    } catch (error) {
        console.error("Error calling Hugging Face API:");
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
             // Check for common HF errors
            if (error.response.status === 503) {
                throw new Error("Model is currently loading, please try again shortly.");
            }
            if (error.response.data && error.response.data.error) {
                 throw new Error(`Hugging Face Error: ${error.response.data.error}`);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request:", error.request);
            throw new Error("No response received from Hugging Face API.");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error Message:", error.message);
        }
        // General fallback error
        throw new Error("Failed to get response from chat service.");
    }
};

export default callHuggingFaceApi;