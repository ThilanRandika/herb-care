const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service:  "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

async function sendEmail(receiver, html, subject) {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Herb Care",
        address: process.env.EMAIL,
      },
      to: receiver,
      subject: subject,
      text: "",
      html: html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  sendEmail,
};
