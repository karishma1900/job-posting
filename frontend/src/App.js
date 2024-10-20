import React, { useState, useEffect } from 'react';
import { BrowserRouter , Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register';
import Login from './pages/LoginPage/LoginPage';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import JobPostingDisplay from './components/JobPosting/JobPosting';
import Verify from './components/verify/Verify';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    // Effect to check localStorage for user authentication status
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setIsAuthenticated(true);
            setUserName(storedUserName);
            console.log("Retrieved user from localStorage:", storedUserName);
        }
    }, []);

    const handleLogin = (email) => {
        setIsAuthenticated(true);
        setUserName(email);
        localStorage.setItem('userName', email);
        console.log("Stored user in localStorage:", email);
        toast.success('Login successful!');
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserName('');
        localStorage.removeItem('userName');
        toast.info('You have logged out.');
    };

    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/" />;
    };

    return (
        <BrowserRouter>
       
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            {isAuthenticated && <Navbar userName={userName} onLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />} />
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Register onLogin={handleLogin} />} />
                <Route path="/jobform" element={<ProtectedRoute element={<JobPostingDisplay />} />} />
                <Route path="/verify" element={<Verify />} />
            </Routes>
       
        </BrowserRouter>
    );
};

export default App;
