const axios = require('axios');
const config = require('../config/config');

const sendEmail = async ({ email, subject, message, html }) => {
  if (!config.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing');
  }

  if (!config.FROM_EMAIL) {
    throw new Error('FROM_EMAIL is missing');
  }

  console.log('RESEND DEBUG:', {
    hasApiKey: !!config.RESEND_API_KEY,
    fromEmail: config.FROM_EMAIL,
    toEmail: email,
  });

  try {
    const response = await axios.post(
      'https://api.resend.com/emails',
      {
        from: `${config.FROM_NAME || 'Sprintly'} <${config.FROM_EMAIL}>`,
        to: email,
        subject,
        text: message || '',
        html: html || `<p>${message || ''}</p>`,
      },
      {
        headers: {
          Authorization: `Bearer ${config.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );

    console.log('Resend mail sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Resend send failed:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = sendEmail;