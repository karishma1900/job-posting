import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./JobListing.css";

const JobPostingDisplay = () => {
    const [jobPostings, setJobPostings] = useState([]);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await axios.get('https://job-posting-6lg2.onrender.com/job-posts'); // Correct the endpoint here
                setJobPostings(response.data); // Assuming response.data is an array of job postings
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        fetchJobPostings();
    }, []);

    return (
        <div className="container">
            {jobPostings.length === 0 ? (
                <p className="no-job-postings">No job postings available.</p>
            ) : (
                jobPostings.map((job) => (
                    <div key={job._id} className="job-listing"> {/* Use _id instead of id since mongoose generates _id */}
                        <h3 className="job-title">{job.jobTitle}</h3>
                        <p className="job-description">{job.jobDescription}</p>
                        {/* Include other job details as needed */}
                    </div>
                ))
            )}
        </div>
    );
};

export default JobPostingDisplay;
