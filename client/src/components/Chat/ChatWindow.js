import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import chatApi from '../../services/chatApi';
import LoadingSpinner from '../Common/LoadingSpinner';

const ChatWindow = () => {
    // message format: { sender: 'user' | 'bot', text: string }
    const [messages, setMessages] = useState([
        { sender: 'bot', text: "Hello! How can I help you today?" } // Initial message
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendMessage = async (userMessage) => {
        setError(''); // Clear previous errors
        // Add user message to chat
        setMessages(prevMessages => [...prevMessages, { sender: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await chatApi.sendMessage(userMessage);
            // Add bot response to chat
            setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: response.reply }]);
        } catch (err) {
            console.error("Failed to send message:", err);
             // Display specific error message from API if available
             setError(err.message || "Sorry, something went wrong.");
             // Optionally add an error message to the chat window
             setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: `Error: ${err.message || "Failed to connect"}` }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <h2>Chatbot</h2>
             {error && <p className="error-message">{error}</p>}
            <div className="chat-window">
                <MessageList messages={messages} />
                {isLoading && <LoadingSpinner small /> } {/* Show spinner in chat area */}
            </div>
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading}/>
        </div>
    );
};

export default ChatWindow;