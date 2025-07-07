const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Check if email credentials are configured
    const hasEmailConfig = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;
    
    if (hasEmailConfig) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Development mode - no email configuration
      this.transporter = null;
      console.log('⚠️  Email service not configured. OTPs will be logged to console in development mode.');
    }
  }

  // Send OTP email
  async sendOTPEmail(email, otp, type = 'login') {
    const subject = this.getOTPSubject(type);
    const html = this.getOTPEmailTemplate(otp, type);
    
    // If no email configuration, log to console for development
    if (!this.transporter) {
      console.log('\n📧 OTP Email (Development Mode):');
      console.log('To:', email);
      console.log('Subject:', subject);
      console.log('OTP:', otp);
      console.log('HTML:', html);
      console.log('📧 End OTP Email\n');
      return { success: true, messageId: 'dev-mode-' + Date.now() };
    }
    
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: html,
      });
      
      console.log('OTP Email sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send password reset email
  async sendPasswordResetEmail(email, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">BEATEN</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Password Reset Request</h2>
          <p style="color: #666; line-height: 1.6;">
            You requested a password reset for your BEATEN account. Click the button below to reset your password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this password reset, please ignore this email. This link will expire in 10 minutes.
          </p>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser: ${resetUrl}
          </p>
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>© 2024 BEATEN. All rights reserved.</p>
        </div>
      </div>
    `;

    // If no email configuration, log to console for development
    if (!this.transporter) {
      console.log('\n📧 Password Reset Email (Development Mode):');
      console.log('To:', email);
      console.log('Reset URL:', resetUrl);
      console.log('📧 End Password Reset Email\n');
      return { success: true, messageId: 'dev-mode-' + Date.now() };
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'BEATEN - Password Reset Request',
        html: html,
      });
      
      console.log('Password reset email sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send welcome email
  async sendWelcomeEmail(email, name) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">BEATEN</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Welcome to BEATEN, ${name}!</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for joining BEATEN! You're now part of our exclusive fashion community.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Start exploring our latest collections and discover your unique style.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}" 
               style="background-color: #1a1a1a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Shopping
            </a>
          </div>
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>© 2024 BEATEN. All rights reserved.</p>
        </div>
      </div>
    `;

    // If no email configuration, log to console for development
    if (!this.transporter) {
      console.log('\n📧 Welcome Email (Development Mode):');
      console.log('To:', email);
      console.log('Name:', name);
      console.log('📧 End Welcome Email\n');
      return { success: true, messageId: 'dev-mode-' + Date.now() };
    }

    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to BEATEN!',
        html: html,
      });
      
      console.log('Welcome email sent: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }

  // Get OTP email subject
  getOTPSubject(type) {
    const subjects = {
      login: 'BEATEN - Login OTP',
      email_verification: 'BEATEN - Email Verification OTP',
      phone_verification: 'BEATEN - Phone Verification OTP',
      password_reset: 'BEATEN - Password Reset OTP'
    };
    return subjects[type] || 'BEATEN - OTP';
  }

  // Get OTP email template
  getOTPEmailTemplate(otp, type) {
    const messages = {
      login: 'Use this OTP to login to your BEATEN account:',
      email_verification: 'Use this OTP to verify your email address:',
      phone_verification: 'Use this OTP to verify your phone number:',
      password_reset: 'Use this OTP to reset your password:'
    };

    const message = messages[type] || 'Use this OTP:';

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">BEATEN</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333; margin-bottom: 20px;">Your OTP</h2>
          <p style="color: #666; line-height: 1.6;">
            ${message}
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: #1a1a1a; color: white; padding: 20px; border-radius: 10px; display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 5px;">
              ${otp}
            </div>
          </div>
          <p style="color: #666; font-size: 14px;">
            This OTP will expire in 5 minutes. Do not share this OTP with anyone.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't request this OTP, please ignore this email.
          </p>
        </div>
        <div style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>© 2024 BEATEN. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  // Test email configuration
  async testConnection() {
    if (!this.transporter) {
      return { success: false, error: 'Email service not configured' };
    }
    
    try {
      await this.transporter.verify();
      return { success: true, message: 'Email service is configured correctly' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
async sendFormSubmissionEmail({ name, email, subject, message }) {
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">BEATEN</h1>
      </div>
      <div style="padding: 30px; background-color: #f9f9f9;">
        <h2 style="color: #333;">Hi ${name},</h2>
        <p>Thank you for contacting BEATEN. We've received your message and will get back to you soon.</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Your Message:</strong><br/>${message}</p>
      </div>
      <div style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2024 BEATEN. All rights reserved.</p>
      </div>
    </div>
  `;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">BEATEN - Contact Form Submission</h1>
      </div>
      <div style="padding: 30px; background-color: #f9f9f9;">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      </div>
      <div style="background-color: #f0f0f0; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>© 2024 BEATEN. All rights reserved.</p>
      </div>
    </div>
  `;

  const adminEmail = process.env.ADMIN_EMAIL;

  try {
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `BEATEN - We received your message: ${subject}`,
      html: userHtml,
    });

    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: `New Contact Message from ${name}: ${subject}`,
      html: adminHtml,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending form emails:', error);
    return { success: false, error: error.message };
  }
}


}

module.exports = new EmailService(); 