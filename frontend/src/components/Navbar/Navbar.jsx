// src/components/Navbar/Navbar.js
import React from 'react';
import logo from '../../assets/cuvet.jpg'; // Use your actual logo
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ userName, onLogout }) => {
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
                            <button className="logout-btn" onClick={onLogout}>Logout</button>
                        </>
                    ) : (
                        <a href="/contact">Contact</a>
                    )}
                    <div className="dropdown">
                        <button className="dropbtn">Your Name</button>
                        <div className="dropdown-content">
                            <a href="/profile">Profile</a>
                            <a href="/settings">Settings</a>
                        </div>
                    </div>
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
