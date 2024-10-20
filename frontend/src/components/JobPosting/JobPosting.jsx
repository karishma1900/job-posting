import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobPostingDisplay = () => {
    const [jobPosts, setJobPosts] = useState([]);
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobDescription: '',
        experienceLevel: '',
        candidateEmail: '',
        endDate: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchJobPosts = async () => {
            try {
                const response = await axios.get('https://job-posting-6lg2.onrender.com/job-posts');
                setJobPosts(response.data);
            } catch (error) {
                console.error('Error fetching job posts:', error);
            }
        };

        fetchJobPosts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://job-posting-6lg2.onrender.com/job-post', formData);
            setMessage(response.data.message);
            setFormData({
                jobTitle: '',
                jobDescription: '',
                experienceLevel: '',
                candidateEmail: '',
                endDate: ''
            });
            // Optionally, fetch the job posts again to include the new one
            fetchJobPosts();
        } catch (error) {
            console.error('Error posting job:', error);
            setMessage('Error posting job.');
        }
    };

    return (
        <div>
            <h2>Job Listings</h2>
            {jobPosts.length > 0 ? (
                jobPosts.map((job) => (
                    <div key={job._id} className="job-post">
                        <h3>{job.jobTitle}</h3>
                        <p>{job.jobDescription}</p>
                        <p>Experience Level: {job.experienceLevel}</p>
                        <p>Candidate Email: {job.candidateEmail}</p>
                        <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No job postings found.</p>
            )}

            <div className="job-post-form">
                <h2>Post a New Job</h2>
                {message && <p>{message}</p>}
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
        </div>
    );
};

export default JobPostingDisplay;
