import React from 'react';
import logo from '../../assets/cuvet.jpg'; // Replace with your actual logo path
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // This will handle the actual logout logic in the parent component
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div className="main">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    {userName ? (
                        <>
                            <span className="user-name">{userName}</span>
                            <div className="dropdown">
                                <button className="dropbtn">{userName || "Your Name"}</button>
                                <div className="dropdown-content">
                                    <a href="/profile">Profile</a>
                                    <a href="/settings">Settings</a>
                                    <a href="#" onClick={handleLogout}>Logout</a> {/* Added logout here */}
                                </div>
                            </div>
                        </>
                    ) : (
                        <a href="/contact">Contact</a>
                    )}
                </div>
            </nav>
            <div className="sidebar">
                <a href="/home" className="sidebar-item">
                    <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                </a>
            </div>
        </div>
    );
};

export default Navbar;
