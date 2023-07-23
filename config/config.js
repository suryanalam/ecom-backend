const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET_TEXT: process.env.JWT_SECRET_TEXT,
  GMAIL_APP_USER: process.env.GMAIL_APP_USER,
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};