require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (for your portfolio)
app.use(express.static(path.join(__dirname, '../')));

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Route to handle feedback/contact submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { message, email, name, subject } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER, 
      subject: subject || `Portfolio Contact from ${name || 'Unknown'}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Message:</strong> ${message}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : '<p><strong>Name:</strong> Not provided</p>'}
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : '<p><strong>Email:</strong> Not provided</p>'}
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully');
    
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});