// Navbar.js
import React from 'react';
import logo from '../../assets/cuvet.jpg'; // Adjust this path as necessary
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the logout function passed as a prop
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <div className="main">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    {userName ? ( // If userName exists, show greeting and logout
                        <div className="dropdown">
                            <button className="dropbtn">Hello, {userName}</button> {/* Display user email */}
                            <div className="dropdown-content">
                                <a href="#" onClick={handleLogout}>Logout</a> {/* Logout link */}
                            </div>
                        </div>
                    ) : (
                        <Link to="/contact">Contact</Link> // If no user is logged in, show contact link
                    )}
                </div>
            </nav>
            <div className="sidebar">
                <Link to="/home" className="sidebar-item">
                    <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar; // Ensure this line is present for default export
