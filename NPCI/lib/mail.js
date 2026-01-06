import nodemailer from "nodemailer";
import { config } from "dotenv";
config(); // MUST be at the very top

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// Configure SMTP transporter
export const transporter = nodemailer.createTransport({
  service: "Gmail", // or any SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password if using Gmail
  },
});

// Send email function
export const sendEmail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: `"Quicklink DBT" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    headers: {
      "X-Priority": "1",
      Importance: "High", // marks email as important
    },
  };

  return transporter.sendMail(mailOptions);
};
