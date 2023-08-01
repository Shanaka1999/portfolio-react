// Install the nodemailer library by running: npm install nodemailer

const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

// Define the endpoint to handle the form submission
app.post('/submitForm', (req, res) => {
  const { name, email, message } = req.body;

  // Replace the following with your email configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password',
    },
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient@example.com', // Replace with your email address to receive messages.
    subject: 'New message from the contact form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: 'Message sent successfully!' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
