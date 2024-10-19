import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import logo from "../../assets/cuvet.jpg";
import "./Register.css";

const Register = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        companyName: '',
        phoneNo: '',
        companyEmail: '',
        employeeSize: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already registered
        const checkUserExists = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/check-email/${formData.companyEmail}`);
                if (response.data.exists) {
                    toast.info('You are already registered. Redirecting to login.');
                    navigate('/login'); // Redirect to login if user is already registered
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
            }
        };

        if (formData.companyEmail) {
            checkUserExists();
        }
    }, [formData.companyEmail, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/register', formData);
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
            navigate('/verify'); // Navigate to a verification or next step
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
                    {/* Input fields remain unchanged */}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                    />
                    <input
                        type="email"
                        name="companyEmail"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        placeholder="Company Email"
                        required
                    />
                    <input
                        type="number"
                        name="employeeSize"
                        value={formData.employeeSize}
                        onChange={handleChange}
                        placeholder="Employee Size"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {/* Added login link below the form */}
                <div className="login-link">
                    <p>Already have an account? <Link to="/login">Login here</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
