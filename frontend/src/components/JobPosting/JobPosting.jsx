import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import "./JobPosting.css";

const JobPostingDisplay = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        experienceLevel: '',
        candidateEmail: '',
        endDate: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://job-posting-6lg2.onrender.com/job-post', formData);
            setMessage(response.data.message);
            // Show success notification
            toast.success('Job posted successfully!');
            // Reset the form data
            setFormData({
                jobTitle: '',
                jobDescription: '',
                experienceLevel: '',
                candidateEmail: '',
                endDate: ''
            });
            // Redirect to home page after a short delay
            setTimeout(() => {
                navigate('/home');
            }, 2000); // Redirects after 2 seconds
        } catch (error) {
            console.error('Error posting job:', error);
            setMessage('Error posting job.');
            // Show error notification
            toast.error('Error posting job.');
        }
    };

    return (
        <div className="main-body">
            <h2>Post a New Job</h2>
            {message && <p>{message}</p>}
            <div className="job-post-form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobDescription">Job Description</label>
                        <textarea
                            id="jobDescription"
                            name="jobDescription"
                            value={formData.jobDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="experienceLevel">Experience Level</label>
                        <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Experience Level</option>
                            <option value="Entry">Entry</option>
                            <option value="Mid">Mid</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="candidateEmail">Candidate Email</label>
                        <input
                            type="email"
                            id="candidateEmail"
                            name="candidateEmail"
                            value={formData.candidateEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">Post Job</button>
                </form>
            </div>
            <ToastContainer /> {/* Toast notification container */}
        </div>
    );
};

export default JobPostingDisplay;
