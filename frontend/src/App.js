import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register';
import Login from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import JobPostForm from './components/JobPosting/JobPosting';
import Verify from './components/verify/Verify'; // Corrected import path

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    const handleLogin = (name) => {
        setIsAuthenticated(true);
        setUserName(name);
        toast.success('Login successful!');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName('');
        toast.info('You have logged out.');
    };

    return (
        <Router>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            {isAuthenticated && <Navbar userName={userName} onLogout={handleLogout} />}
            <Routes>
                {/* Redirect to Home if authenticated, otherwise show Register */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                
                {/* Redirect to Home if authenticated, otherwise show Login */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                
                {/* Protected Home route */}
                <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                
                {/* Redirect to Home if authenticated, otherwise show Register */}
                <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                
                {/* Protected JobPostForm route */}
                <Route path="/jobform" element={isAuthenticated ? <JobPostForm /> : <Navigate to="/login" />} />
                
                {/* Email verification route */}
                <Route path="/verify" element={<Verify />} />
            </Routes>
        </Router>
    );
};

export default App;
