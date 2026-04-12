const nodemailer = require('nodemailer');
const config = require('../config/config');

const sendEmail = async ({ email, subject, message, html }) => {
  console.log('SMTP DEBUG:', {
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    hasUser: !!config.SMTP_EMAIL,
    hasPass: !!config.SMTP_PASSWORD,
  });

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: false,
    auth: {
      user: config.SMTP_EMAIL,
      pass: config.SMTP_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    await transporter.verify();
    console.log('SMTP verify success');
  } catch (error) {
    console.error('SMTP verify failed:', error);
    throw error;
  }

  const mailOptions = {
    from: `${config.FROM_NAME || 'Sprintly'} <${config.SMTP_EMAIL}>`,
    to: email,
    subject,
    text: message || '',
    html: html || '',
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Mail sent:', info.messageId);
  return info;
};

module.exports = sendEmail;