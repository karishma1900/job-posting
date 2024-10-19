// src/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBuilding, faPhone, faEnvelope, faUsers, faLock } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/cuvet.jpg";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        phoneNo: '',
        companyEmail: '',
        employeeSize: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://job-posting-6lg2.onrender.com/register', formData);
            toast.success(response.data.message);
            toast.info('A verification email has been sent to your email address. Please check your inbox.');
            setFormData({
                name: '',
                companyName: '',
                phoneNo: '',
                companyEmail: '',
                employeeSize: '',
                password: ''
            });
        } catch (error) {
            console.error('Error during registration:', error);
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='form-1'>
            <div className="navbar">
                <img src={logo} alt="logo" />
                <a href="/"><h2>Contact</h2></a>
            </div>

            <div className="body">
                <div className="intro">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore nihil deserunt doloremque...</p>
                </div>

                <form onSubmit={handleSubmit} className='form'>
                    <h2>Register</h2>
                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <input 
                                type="text" 
                                name="name"
                                placeholder='Name' 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faBuilding} className="icon" />
                            <input 
                                type="text" 
                                name="companyName"
                                placeholder='Company Name' 
                                value={formData.companyName} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faPhone} className="icon" />
                            <input 
                                type="tel" 
                                name="phoneNo" 
                                placeholder="Phone No"
                                value={formData.phoneNo} 
                                onChange={handleChange} 
                                required 
                                pattern="[0-9]{10}" 
                                title="Please enter a valid phone number"
                            />
                        </div>
                    </div>

                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input 
                                type="email" 
                                name="companyEmail" 
                                placeholder='Company Email'
                                value={formData.companyEmail} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>

                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faUsers} className="icon" />
                            <input 
                                type="number" 
                                name="employeeSize" 
                                placeholder='Employee Size'
                                value={formData.employeeSize} 
                                onChange={handleChange} 
                                required 
                                min="1" 
                            />
                        </div>
                    </div>

                    <div className='key'>
                        <div className="input-container">
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input 
                                type="password" 
                                name="password" 
                                placeholder='Password'
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                minLength="6" 
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
