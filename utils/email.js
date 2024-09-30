const nodemailer = require("nodemailer");
require("dotenv").config;
const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log(`email sent sucessfully ${text}`);
  } catch (error) {
    console.log(`${error} email not sent`);
  }
};

module.exports = sendEmail;
