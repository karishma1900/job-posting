// Navbar.js
import React from 'react';
import logo from '../../assets/cuvet.jpg'; // Adjust this path as necessary
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {  Link } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };
    

    return (
        <div className="main">
            <nav className="navbar">
                <div className="navbar-left">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </div>
                <div className="navbar-right">
                    {userName ? (
                        <div className="dropdown">
                            <button className="dropbtn">Hello, {userName}</button>
                            <div className="dropdown-content">
                                <a href="#" onClick={handleLogout}>Logout</a>
                            </div>
                        </div>
                    ) : (
                        <a href="/contact">Contact</a>
                    )}
                </div>
            </nav>
            <div className="sidebar">
                <a href="/home" className="sidebar-item">
                   <Link to="/login"><FontAwesomeIcon icon={faHome} className="sidebar-icon" /></Link>
                </a>
            </div>
        </div>
    );
};

export default Navbar; // Make sure this line is present for default export
