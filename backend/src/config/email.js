import nodemailer from 'nodemailer';

let transporter;

if (process.env.NODE_ENV === 'development') {
  transporter = nodemailer.createTransport({
    host: process.env.MAILHOG_HOST,
    port: process.env.MAILHOG_PORT,
    secure: false
  });
} else {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export default transporter;
