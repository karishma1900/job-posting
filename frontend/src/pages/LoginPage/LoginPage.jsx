import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import "./LoginPage.css";
import logo from "../../assets/cuvet.jpg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        companyEmail: '',
        password: ''
    });

    useEffect(() => {
        const user = localStorage.getItem('userName'); // Check for logged-in user by userName
        if (user) {
            navigate('/home'); // Redirect to home if user is logged in
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('https://job-posting-6lg2.onrender.com/login', formData);
            toast.success(response.data.message);
            onLogin(formData.companyEmail); // Pass the email to the login handler
            navigate('/home'); // Redirect to home page
        } catch (error) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occurred during login");
            }
        }
    };

    return (
        <div className="form1">
            <div className="navbar">
                <img src={logo} alt="logo" />
                <a href="/"><h2>Contact</h2></a>
            </div>
            <div className="body">
                <div className="intro">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore nihil deserunt doloremque...</p>
                </div>

                <form onSubmit={handleSubmit} className='form'>
                    <h2>Login</h2>
                    <div className="input-container">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            type="email"
                            name="companyEmail"
                            value={formData.companyEmail}
                            onChange={handleChange}
                            placeholder="Enter company email"
                            required
                        />
                    </div>

                    <div className="input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit">Login</button>
                    <div className="login-link">
                        <p>Already have an account? <Link to="/register">Register here</Link>.</p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
