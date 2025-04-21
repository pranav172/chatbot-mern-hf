import React, { useEffect, useRef } from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
    const messagesEndRef = useRef(null); // Ref to scroll to bottom

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom whenever messages change
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((msg, index) => (
                <Message key={index} message={msg} />
            ))}
            {/* Empty div at the end to scroll to */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;