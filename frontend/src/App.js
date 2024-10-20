// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register';
import Login from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import JobPostingDisplay from './components/JobPosting/JobPosting';
import Verify from './components/verify/Verify'; // Import the Verify component

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState(''); // State for user name

    const handleLogin = (name) => {
        setIsAuthenticated(true);
        setUserName(name); // Set the user name on login
        toast.success('Login successful!');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName(''); // Clear user name on logout
        toast.info('You have logged out.');
    };

    return (
        <Router>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            {isAuthenticated && <Navbar userName={userName} onLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                <Route path="/jobform" element={<JobPostingDisplay />} />
                <Route path="/verify" element={<Verify />} />
            </Routes>
        </Router>
    );
};

export default App;
