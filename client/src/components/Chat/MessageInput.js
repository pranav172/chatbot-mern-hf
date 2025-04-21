import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, isLoading }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim() || isLoading) return; // Prevent sending empty or during load
        onSendMessage(inputText);
        setInputText(''); // Clear input after sending
    };

    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isLoading}
                    aria-label="Chat input"
                />
                <button type="submit" disabled={isLoading || !inputText.trim()}>
                    {isLoading ? '...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default MessageInput;