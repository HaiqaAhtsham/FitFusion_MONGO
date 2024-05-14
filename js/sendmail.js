const nodemailer = require('nodemailer');

// Create a transporter object
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: 'laibairfan611@gmail.com',
      pass: 'awfouedccyuboerz'
    }
  });


// Define the mail options
var mailOptions = {
    from: "FitFusion",
    subject: "Email Verification",
    html: "Welcome to FitFusion! We're excited to have you join our community"
  };

// Function to send mail
const sendMail = (email,username) => {
   
    mailOptions.to = email;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { transporter, mailOptions, sendMail };
