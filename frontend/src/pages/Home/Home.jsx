import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import JobPostingDisplay from "../../components/JobListing/JobListing"; // Ensure the import path is correct

import './Home.css'

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleCreateInterview = () => {
    navigate('/jobform'); // Redirect to the job posting page
  };

  return (
    <div className="button">
      
      <div className="main-body">
        <JobPostingDisplay />
        <button onClick={handleCreateInterview}>Create Interview</button> {/* Attach the click handler */}
      </div>
    </div>
  );
};

export default Home;
