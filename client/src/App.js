import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import useAuth from './hooks/useAuth'; // Import useAuth to use inside ProtectedRoute

import Navbar from './components/Layout/Navbar'; // Your Navbar
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoadingSpinner from './components/Common/LoadingSpinner'; // Ensure path is correct

// Component to protect routes
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        // Using a full-page container might look better for loading
        // return <div className="container" style={{textAlign: 'center', paddingTop: '5rem'}}><LoadingSpinner /></div>;
        // Or simpler:
         return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><LoadingSpinner /></div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

// Component for routes accessible only when logged out
const PublicRoute = ({ children }) => {
     const { user, loading } = useAuth();

      if (loading) {
        // return <div className="container" style={{textAlign: 'center', paddingTop: '5rem'}}><LoadingSpinner /></div>;
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><LoadingSpinner /></div>;
    }

    return user ? <Navigate to="/" replace /> : children;
}

// Main App Component
function App() {
    // --- NEW: Get current year for footer ---
    const currentYear = new Date().getFullYear();
    // --- END NEW ---

    return (
        <AuthProvider>
            <Router>
                {/* --- NEW: Optional wrapper for flexbox layout --- */}
                <div className="app-wrapper">
                    <Navbar /> {/* Render Navbar on all pages */}

                    {/* --- NEW: Optional main content area --- */}
                    <main className="content">
                        <Routes>
                            {/* Protected Route */}
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <HomePage />
                                    </ProtectedRoute>
                                }
                            />
                            {/* Public Routes */}
                            <Route path="/login" element={
                                <PublicRoute>
                                    <LoginPage />
                                </PublicRoute>
                            } />
                            <Route path="/signup" element={
                                <PublicRoute>
                                    <SignupPage />
                                </PublicRoute>
                            } />
                            {/* Fallback Route */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                    {/* --- END NEW main content area --- */}


                    {/* --- NEW: Footer --- */}
                    <footer className="app-footer">
                        Copyright © {currentYear} Pranav
                    </footer>
                    {/* --- END NEW Footer --- */}

                </div>
                {/* --- END NEW Optional wrapper --- */}
            </Router>
        </AuthProvider>
    );
}

export default App;