/**
 * Twilio SMS Service
 *
 * SETUP INSTRUCTIONS:
 * 1. Sign up at https://www.twilio.com/try-twilio
 * 2. Get Account SID, Auth Token, and Phone Number
 * 3. Add to .env file (see .env.example)
 * 4. Install: npm install twilio
 */

// For development/testing without Twilio
const isMockMode = !process.env.REACT_APP_TWILIO_ACCOUNT_SID ||
                   process.env.REACT_APP_TWILIO_ACCOUNT_SID === 'ACxxxxxxxxxxxx';

let twilioClient = null;

// Initialize Twilio client (only in Node.js environment, not browser)
if (typeof window === 'undefined' && !isMockMode) {
  try {
    const twilio = require('twilio');
    twilioClient = twilio(
      process.env.REACT_APP_TWILIO_ACCOUNT_SID,
      process.env.REACT_APP_TWILIO_AUTH_TOKEN
    );
  } catch (error) {
    console.warn('Twilio not initialized:', error.message);
  }
}

/**
 * Send SMS via Twilio
 * @param {string} to - Recipient phone number (E.164 format: +16155551234)
 * @param {string} body - Message text
 * @returns {Promise<Object>} {success: boolean, sid?: string, error?: string}
 */
export const sendSMS = async (to, body) => {
  // Mock mode for development
  if (isMockMode) {
    console.log('📱 [MOCK SMS]');
    console.log(`To: ${to}`);
    console.log(`Message:\n${body}`);
    console.log('---');
    return {
      success: true,
      sid: `mock-${Date.now()}`,
      mock: true
    };
  }

  // Production mode - actually send SMS
  if (!twilioClient) {
    return {
      success: false,
      error: 'Twilio client not initialized. Check environment variables.'
    };
  }

  try {
    const message = await twilioClient.messages.create({
      body,
      from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
      to
    });

    console.log(`✅ SMS sent to ${to} (SID: ${message.sid})`);

    return {
      success: true,
      sid: message.sid,
      status: message.status
    };
  } catch (error) {
    console.error('❌ Twilio SMS error:', error.message);

    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean}
 */
export const isValidPhoneNumber = (phone) => {
  // E.164 format: +[country code][number]
  // Example: +16155551234
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone number to E.164
 * @param {string} phone - Phone number in any format
 * @returns {string} E.164 formatted number
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');

  // Add +1 for US numbers if not present
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return phone; // Return as-is if can't format
};

/**
 * Test Twilio configuration
 * Sends a test message to admin phone
 */
export const testTwilioSetup = async () => {
  const adminPhone = process.env.REACT_APP_ADMIN_PHONE;

  if (!adminPhone) {
    return {
      success: false,
      error: 'REACT_APP_ADMIN_PHONE not set in .env'
    };
  }

  const testMessage = `🧪 Twilio test successful!\n\nBoro Appliance Pros SMS notifications are working.`;

  return await sendSMS(adminPhone, testMessage);
};

export default {
  sendSMS,
  isValidPhoneNumber,
  formatPhoneNumber,
  testTwilioSetup
};
