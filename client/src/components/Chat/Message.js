import React from 'react';

const Message = ({ message }) => {
    // Destructure all expected properties from the message object
    const { sender, text, timestamp } = message;
    const messageClass = sender === 'user' ? 'user' : 'bot';

    // --- NEW: Format the timestamp ---
    // Create a readable time string (e.g., "10:30 AM")
    // You can use more advanced libraries like 'date-fns' or 'moment' for more complex formatting if needed
    let timeString = '';
    if (timestamp) {
        try {
            // Ensure timestamp is a valid Date object before formatting
            const dateObject = new Date(timestamp);
            if (!isNaN(dateObject.getTime())) { // Check if the date is valid
                 timeString = dateObject.toLocaleTimeString([], {
                    hour: 'numeric', // e.g., '10'
                    minute: '2-digit', // e.g., '30'
                    // hour12: true // Optional: use AM/PM
                 });
            } else {
                console.warn("Invalid timestamp received:", timestamp);
            }
        } catch (error) {
            console.error("Error formatting timestamp:", error);
        }
    }
    // --- END NEW ---

    return (
        // Add the messageClass ('user' or 'bot') to the outer div
        <div className={`message ${messageClass}`}>
            {/* Keep the paragraph for the message text */}
            <p>{text}</p>
            {/* --- NEW: Display the formatted time string --- */}
            {/* Conditionally render the timestamp span if timeString is not empty */}
            {timeString && (
                <span className="message-timestamp">{timeString}</span>
            )}
            {/* --- END NEW --- */}
        </div>
    );
};

export default Message;