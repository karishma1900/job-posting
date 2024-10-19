const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  candidateEmail: { type: String, required: true },
  endDate: { type: Date, required: true },
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
