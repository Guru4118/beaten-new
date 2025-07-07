// const twilio = require('twilio');

// class SMSService {
//   constructor() {
//     this.client = twilio(
//       process.env.TWILIO_ACCOUNT_SID,
//       process.env.TWILIO_AUTH_TOKEN
//     );
//     this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
//   }

//   // Send OTP SMS
//   async sendOTPSMS(phoneNumber, otp, type = 'login') {
//     const message = this.getOTPMessage(otp, type);
    
//     try {
//       const result = await this.client.messages.create({
//         body: message,
//         from: this.fromNumber,
//         to: phoneNumber
//       });
      
//       console.log('OTP SMS sent: %s', result.sid);
//       return { success: true, messageId: result.sid };
//     } catch (error) {
//       console.error('Error sending OTP SMS:', error);
//       return { success: false, error: error.message };
//     }
//   }

//   // Send welcome SMS
//   async sendWelcomeSMS(phoneNumber, name) {
//     const message = `Welcome to BEATEN, ${name}! Thank you for joining our exclusive fashion community. Start exploring our latest collections at ${process.env.FRONTEND_URL}`;
    
//     try {
//       const result = await this.client.messages.create({
//         body: message,
//         from: this.fromNumber,
//         to: phoneNumber
//       });
      
//       console.log('Welcome SMS sent: %s', result.sid);
//       return { success: true, messageId: result.sid };
//     } catch (error) {
//       console.error('Error sending welcome SMS:', error);
//       return { success: false, error: error.message };
//     }
//   }

//   // Send order confirmation SMS
//   async sendOrderConfirmationSMS(phoneNumber, orderId, amount) {
//     const message = `Your BEATEN order #${orderId} has been confirmed! Total amount: ₹${amount}. Track your order at ${process.env.FRONTEND_URL}/orders/${orderId}`;
    
//     try {
//       const result = await this.client.messages.create({
//         body: message,
//         from: this.fromNumber,
//         to: phoneNumber
//       });
      
//       console.log('Order confirmation SMS sent: %s', result.sid);
//       return { success: true, messageId: result.sid };
//     } catch (error) {
//       console.error('Error sending order confirmation SMS:', error);
//       return { success: false, error: error.message };
//     }
//   }

//   // Send delivery update SMS
//   async sendDeliveryUpdateSMS(phoneNumber, orderId, status, trackingId = null) {
//     let message = `Your BEATEN order #${orderId} status: ${status}`;
    
//     if (trackingId) {
//       message += `. Tracking ID: ${trackingId}`;
//     }
    
//     message += `. Track at ${process.env.FRONTEND_URL}/orders/${orderId}`;
    
//     try {
//       const result = await this.client.messages.create({
//         body: message,
//         from: this.fromNumber,
//         to: phoneNumber
//       });
      
//       console.log('Delivery update SMS sent: %s', result.sid);
//       return { success: true, messageId: result.sid };
//     } catch (error) {
//       console.error('Error sending delivery update SMS:', error);
//       return { success: false, error: error.message };
//     }
//   }

//   // Get OTP message
//   getOTPMessage(otp, type) {
//     const messages = {
//       login: `Your BEATEN login OTP is: ${otp}. Valid for 5 minutes. Do not share this OTP.`,
//       email_verification: `Your BEATEN email verification OTP is: ${otp}. Valid for 5 minutes.`,
//       phone_verification: `Your BEATEN phone verification OTP is: ${otp}. Valid for 5 minutes.`,
//       password_reset: `Your BEATEN password reset OTP is: ${otp}. Valid for 5 minutes.`
//     };
    
//     return messages[type] || `Your BEATEN OTP is: ${otp}. Valid for 5 minutes.`;
//   }

//   // Test SMS configuration
//   async testConnection() {
//     try {
//       // Try to get account info to test connection
//       const account = await this.client.api.accounts(process.env.TWILIO_ACCOUNT_SID).fetch();
//       return { success: true, message: 'SMS service is configured correctly', account: account.friendlyName };
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   }

//   // Validate phone number format
//   validatePhoneNumber(phoneNumber) {
//     // Remove any non-digit characters
//     const cleaned = phoneNumber.replace(/\D/g, '');
    
//     // Check if it's a valid Indian mobile number
//     if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
//       return `+91${cleaned}`; // Add India country code
//     }
    
//     // Check if it already has country code
//     if (cleaned.length === 12 && cleaned.startsWith('91')) {
//       return `+${cleaned}`;
//     }
    
//     // Check if it already has +91
//     if (phoneNumber.startsWith('+91') && phoneNumber.length === 13) {
//       return phoneNumber;
//     }
    
//     return null; // Invalid format
//   }

//   // Send bulk SMS (for notifications)
//   async sendBulkSMS(phoneNumbers, message) {
//     const results = [];
    
//     for (const phoneNumber of phoneNumbers) {
//       try {
//         const result = await this.client.messages.create({
//           body: message,
//           from: this.fromNumber,
//           to: phoneNumber
//         });
        
//         results.push({ phoneNumber, success: true, messageId: result.sid });
//       } catch (error) {
//         results.push({ phoneNumber, success: false, error: error.message });
//       }
//     }
    
//     return results;
//   }
// }

// module.exports = new SMSService();

// Mock SMS Service for development
class MockSMSService {
  constructor() {
    console.log('📱 Mock SMS Service initialized - SMS functionality disabled');
  }

  async sendOTPSMS(phoneNumber, otp, type = 'login') {
    console.log(`📱 Mock SMS: OTP ${otp} would be sent to ${phoneNumber} for ${type}`);
    return { success: true, messageId: 'mock_sms_id' };
  }

  async sendWelcomeSMS(phoneNumber, name) {
    console.log(`📱 Mock SMS: Welcome message would be sent to ${phoneNumber} for ${name}`);
    return { success: true, messageId: 'mock_welcome_sms_id' };
  }

  async sendOrderConfirmationSMS(phoneNumber, orderId, amount) {
    console.log(`📱 Mock SMS: Order confirmation would be sent to ${phoneNumber} for order ${orderId}`);
    return { success: true, messageId: 'mock_order_sms_id' };
  }

  async sendDeliveryUpdateSMS(phoneNumber, orderId, status, trackingId = null) {
    console.log(`📱 Mock SMS: Delivery update would be sent to ${phoneNumber} for order ${orderId}`);
    return { success: true, messageId: 'mock_delivery_sms_id' };
  }

  async testConnection() {
    return { success: true, message: 'Mock SMS service is active' };
  }

  validatePhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 10 && /^[6-9]/.test(cleaned)) {
      return `+91${cleaned}`;
    }
    return phoneNumber;
  }

  async sendBulkSMS(phoneNumbers, message) {
    console.log(`📱 Mock SMS: Bulk message would be sent to ${phoneNumbers.length} numbers`);
    return phoneNumbers.map(phone => ({ phoneNumber: phone, success: true, messageId: 'mock_bulk_sms_id' }));
  }
}

module.exports = new MockSMSService(); 