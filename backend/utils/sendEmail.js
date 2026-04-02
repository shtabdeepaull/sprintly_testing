const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // use false for port 587
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.verify();

  const mailOptions = {
    from: `${process.env.FROM_NAME || 'Sprintly'} <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject,
    text: message || '',
    html: html || '',
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendEmail;