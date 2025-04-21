import React, { createContext, useState, useEffect, useMemo } from 'react';
import authApi from '../services/authApi'; // Ensure this path is correct

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // User state will hold { _id, name, email }
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [loading, setLoading] = useState(true); // Check initial auth status
    const [authError, setAuthError] = useState(null);

    // Effect to verify user on initial load or token change
    useEffect(() => {
        const verifyUser = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                 setToken(storedToken); // Ensure token state is set
                try {
                    // Fetch user data (including name) using the token
                    const userData = await authApi.getMe(storedToken);
                    // Set the full user object, expecting _id, name, email, etc.
                    setUser(userData);
                } catch (error) {
                    console.error("Token verification failed:", error);
                    // Clear invalid token and user state
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUser(null);
                }
            }
             setLoading(false); // Finished loading/checking
        };

        verifyUser();
    }, []); // Run only once on component mount

    // Login function
    const login = async (email, password) => {
        setLoading(true);
        setAuthError(null);
        try {
            const data = await authApi.login(email, password); // API returns { _id, name, email, token }
            localStorage.setItem('authToken', data.token);
            setToken(data.token);
            // Set user state including the name received from the backend
            setUser({ _id: data._id, email: data.email, name: data.name });
            setLoading(false);
            return true; // Indicate success
        } catch (error) {
            console.error("Login failed:", error);
            setAuthError(error.message || 'Failed to log in');
            setLoading(false);
            return false; // Indicate failure
        }
    };

    // Signup function
    // v----------------------- THE CORRECTION IS HERE (added 'name' parameter) ---v
    const signup = async (name, email, password) => {
    // ^----------------------- THE CORRECTION IS HERE ----------------------------^
        setLoading(true);
        setAuthError(null);
        try {
            // Pass name, email, password to the API call
            const data = await authApi.register(name, email, password); // API returns { _id, name, email, token }
             localStorage.setItem('authToken', data.token);
             setToken(data.token);
             // Set user state including the name received from the backend
             setUser({ _id: data._id, email: data.email, name: data.name });
             setLoading(false);
             return true; // Indicate success
        } catch (error) {
            console.error("Signup failed:", error);
             setAuthError(error.message || 'Failed to sign up');
             setLoading(false);
             return false; // Indicate failure
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setAuthError(null); // Clear any previous errors on logout
    };

    // Memoize the context value to prevent unnecessary re-renders
    // Ensure all values provided by context are included here
     const contextValue = useMemo(() => ({
        user,
        token,
        loading,
        authError,
        login,
        signup,
        logout,
    }), [user, token, loading, authError]); // Dependencies for useMemo


    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children} {/* Optionally render children only when not loading initial auth state */}
            {/* Or just {children} if you handle loading state inside components */}
        </AuthContext.Provider>
    );
};

export default AuthContext;