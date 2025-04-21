import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import useAuth from '../hooks/useAuth'; // To potentially display user info or customize

const HomePage = () => {
     // const { user } = useAuth(); // You can use user info if needed

    return (
        <div className="container">
            {/* Optional: Welcome message */}
            {/* user && <h2>Welcome back, {user.email}!</h2> */}
            <ChatWindow />
        </div>
    );
};

export default HomePage;