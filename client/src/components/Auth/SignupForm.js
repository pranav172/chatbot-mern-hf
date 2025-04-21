import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../Common/LoadingSpinner'; // Ensure this path is correct

const SignupForm = () => {
    // State for all fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); // Local form validation error

    // Auth context functions and state
    const { signup, loading, authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear local errors

        // --- Form Validation ---
        if (!name.trim()) { // Optional: Check if name is not empty
            setError('Please enter your name');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 6) {
             setError('Password must be at least 6 characters long');
             return;
        }
        // --- End Form Validation ---


        // Call the signup function from AuthContext, passing the name
        // v----------------------- THE CORRECTION IS HERE -----------------------v
        const success = await signup(name, email, password);
        // ^----------------------- THE CORRECTION IS HERE -----------------------^

        if (success) {
            navigate('/'); // Redirect to home/chat page on successful signup
        }
        // AuthError from context will display API errors (handled by useAuth hook)
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {/* Display local form errors first, then API errors */}
            {error && <p className="error-message">{error}</p>}
            {authError && !error && <p className="error-message">{authError}</p>}

            {/* Name Input Field */}
            <div className="form-group">
                <label htmlFor="signup-name">Name</label>
                <input
                    type="text"
                    id="signup-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required // HTML5 validation
                    disabled={loading}
                />
            </div>

            {/* Email Input Field */}
            <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                    type="email"
                    id="signup-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required // HTML5 validation
                    disabled={loading}
                />
            </div>

            {/* Password Input Field */}
            <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                    type="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required // HTML5 validation
                     minLength="6" // HTML5 validation
                    disabled={loading}
                />
            </div>

            {/* Confirm Password Input Field */}
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required // HTML5 validation
                    minLength="6" // HTML5 validation
                    disabled={loading}
                />
            </div>

            {/* Submit Button / Loading Spinner */}
            {loading ? <LoadingSpinner small /> : <button type="submit" disabled={loading}>Sign Up</button>}

            {/* Link to Login Page */}
            <div className="auth-links">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </form>
    );
};

export default SignupForm;