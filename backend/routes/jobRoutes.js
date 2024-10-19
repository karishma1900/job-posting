const express = require('express');
const router = express.Router();

// Mock database (replace this with actual DB logic like MongoDB)
let jobs = [];

// Route to handle job posting
router.post('/job-post', (req, res) => {
    const { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate } = req.body;

    if (!jobTitle || !jobDescription || !experienceLevel || !candidateEmail || !endDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Add the job to the "database"
    const newJob = { jobTitle, jobDescription, experienceLevel, candidateEmail, endDate };
    jobs.push(newJob);

    res.status(201).json({ message: 'Job posted successfully', job: newJob });
});

module.exports = router;
