import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Function to get display name (name or email part)
    const getUserDisplayName = () => {
        if (!user) return '';
        if (user.name) return user.name;
        // Fallback if name is missing for some reason
        return user.email ? user.email.split('@')[0] : 'User';
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Chat</Link></li>
                {user ? (
                    <>
                        {/* Display name here */}
                        <li><span>Welcome, {getUserDisplayName()}!</span></li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;