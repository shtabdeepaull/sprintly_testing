// config/config.js
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/sprintly',

  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE || 30,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@sprintly.com',

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000,
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
};