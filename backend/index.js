const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    companyName: String,
    phoneNo: String,
    companyEmail: { type: String, unique: true },
    employeeSize: Number,
    password: String,
    verified: { type: Boolean, default: false },
}, { collection: 'user' }); // Specify collection name if needed

const User = mongoose.model('User', userSchema); // Ensure no extra spaces

// Nodemailer Setup
const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.SECURE === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Registration Endpoint
app.post('/register', async (req, res) => {
    const { name, companyName, phoneNo, companyEmail, employeeSize, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, companyName, phoneNo, companyEmail, employeeSize, password: hashedPassword });
        await newUser.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: companyEmail,
            subject: 'Email Verification',
            text: `Hello ${name},\n\nPlease verify your email by clicking the link: ${process.env.BASE_URL}/verify?email=${companyEmail}\n\nThank you!`,
        };

        await transporter.sendMail(mailOptions);
        res.status(201).json({ message: 'Registration successful! Verification email sent.' });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already registered.' });
        }
        res.status(500).json({ message: 'Error during registration.' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { companyEmail, password } = req.body;

    if (!companyEmail || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        const user = await User.findOne({ companyEmail });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({ message: 'Login successful!', user: { name: user.name, email: user.companyEmail } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error during login.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
