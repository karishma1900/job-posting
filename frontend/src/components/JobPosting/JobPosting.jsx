import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobPostingDisplay = () => {
    const [jobPosts, setJobPosts] = useState([]);
    
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
        </div>
    );
};

export default JobPostingDisplay;
