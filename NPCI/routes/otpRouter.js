import express from "express";
import OTP from "../models/otpModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import mapperModel from "../models/mapperModel.js";
import { sendEmail } from "../lib/mail.js";
import e from "express";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const otpRouter = express.Router();

otpRouter.post("/send-otp", async (req, res) => {
  try {
    console.log("send otp req received");
    const { aadhar } = req.body;

    if (!aadhar) return res.status(400).json({ message: "aadhar required" });

    const email = (await mapperModel.findOne({ aadharNumber: aadhar }))
      .registeredEmail;
    // console.log("printing email: ", email);
    if (!email)
      return res
        .status(404)
        .json({ message: "No registered email found for this aadhar" });

    const otp = generateOTP();

    // hash OTP before saving
    const hashedOtp = await bcrypt.hash(otp, 10);

    await OTP.create({
      email,
      otp: hashedOtp,
      expiresAt: Date.now() + 2 * 60 * 1000,
    });

    await sendEmail({
      to: email,
      subject: "Your OTP Code for Aadhar Verification",
      text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    });

    // Send OTP using nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.SMTP_EMAIL,
    //     pass: process.env.SMTP_PASSWORD,
    //   },
    // });

    // await transporter.sendMail({
    //   from: process.env.SMTP_EMAIL,
    //   to: email,
    //   subject: "Your OTP Code for Aadhar Verification",
    //   text: `Your OTP is ${otp}. It expires in 2 minutes.`,
    // });

    res.json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

otpRouter.post("/verify-otp", async (req, res) => {
  try {
    const { aadhar, otp } = req.body;

    if (!aadhar || !otp)
      return res
        .status(400)
        .json({ message: "Aadhar ID and OTP required", success: false });

    // 1️⃣ Fetch mapping to get email
    const mapping = await mapperModel.findOne({ aadharNumber: aadhar });
    if (!mapping)
      return res
        .status(404)
        .json({ message: "Mapping not found", success: false });

    const email = mapping.registeredEmail;
    console.log(email, otp);
    // 2️⃣ Find OTP record for this email
    const record = await OTP.findOne({ email });
    console.log("OTP record:", record);
    if (!record)
      return res
        .status(400)
        .json({ message: "OTP not found or already used", success: false });

    // 3️⃣ Check expiry
    if (record.expiresAt < Date.now())
      return res.status(400).json({ message: "OTP expired", success: false });

    // 4️⃣ Compare entered OTP with hashed OTP
    const isValid = await bcrypt.compare(otp, record.otp);
    if (!isValid)
      return res.status(400).json({ message: "Invalid OTP", success: false });

    // 5️⃣ OTP correct → delete record
    await OTP.deleteOne({ _id: record._id });

    res.json({
      message: "OTP verified successfully",
      success: true,
      user: mapping,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default otpRouter;
