// src/components/Verify.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const companyEmail = queryParams.get('email');
        
        const verifyEmail = async () => {
            try {
                // Make a request to your backend for verification
                await axios.get(`https://job-posting-6lg2.onrender.com/verify?email=${ companyEmail}`);
                // Notify user of success
                toast.success('Email verified successfully!');
                
                // Redirect to home after 3 seconds
                setTimeout(() => {
                    navigate('/'); // Use navigate instead of history.push
                }, 3000);
            } catch (error) {
                console.error('Error during email verification:', error);
                toast.error('Verification failed. Please try again.');
            }
        };
        
        if (email) {
            verifyEmail();
        } else {
            toast.error('No email provided for verification.');
            navigate('/'); // Redirect to home if no email
        }
    }, [location.search, navigate]);

    return (
        <div className="verify-container">
            <h2>Email Verification</h2>
            <p>Your email is being verified. Please wait...</p>
        </div>
    );
};

export default Verify;
