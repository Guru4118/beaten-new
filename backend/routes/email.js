// routes/email.js or routes/contact.js

const express = require('express');
const router = express.Router();
const EmailService = require('../utils/emailService'); // adjust path as needed

router.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message || !subject) {
    return res.status(400).json({ success: false, error: 'Email, subject, and message are required' });
  }

  try {
    const result = await EmailService.sendFormSubmissionEmail({ name, email, subject, message });

    if (result.success) {
      return res.status(200).json({ success: true, message: "Emails sent successfully" });
    } else {
      return res.status(500).json({ success: false, error: result.error || "Failed to send emails" });
    }
  } catch (error) {
    console.error('Error in /send-email route:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
