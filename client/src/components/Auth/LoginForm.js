import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../Common/LoadingSpinner'; // Optional

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/'); // Redirect to home/chat page on successful login
        }
        // Error is handled and displayed via useAuth hook
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {authError && <p className="error-message">{authError}</p>}
            <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                    type="email"
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
            <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                />
            </div>
             {loading ? <LoadingSpinner small /> : <button type="submit" disabled={loading}>Login</button>}
             <div className="auth-links">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </form>
    );
};

export default LoginForm;