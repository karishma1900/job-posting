import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Verify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const companyEmail = queryParams.get('email'); // Extract email from query parameters
        
        const verifyEmail = async () => {
            try {
                // Make a request to your backend for verification
                const response = await axios.get(`https://job-posting1-jdts.onrender.com/verify?email=${companyEmail}`);
                
                // Notify user of success
                toast.success(response.data.message);
              
                // Redirect to home after 3 seconds
                setTimeout(() => {
                    navigate('/'); // Redirect to home
                }, 3000);
            } catch (error) {
                console.error('Error during email verification:', error);
                // Check if the error has a response and show the message if it does
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Verification failed. Please try again.');
                }
            }
        };
        
        if (companyEmail) {
            verifyEmail(); // Proceed if companyEmail exists
        } else {
            toast.error('No email provided for verification.');
            navigate('/'); // Redirect to home if no email is provided
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
