const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.get("/", (req, res) => {
  res.send("App Running");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message, phone } = req.body;
  if (!name || !email || !message || !phone) {
    return res.status(400).send("All fields are required");
  }
  res.status(200).send("Email sent successfully!");
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_RECEIVER,
      subject: `Message from ${name}`,
      text: `Name: ${name}\nSender Email: ${email}\nNumber: ${phone}\nMessage: ${message}`,
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("Server running");
});
