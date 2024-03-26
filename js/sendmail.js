const nodemailer = require("nodemailer");

async function sendMail(to) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: 'laibairfan611@gmail.com',
        pass: 'ddltloceigakrjpx'
      }
    });
  
    const mailOptions = {
      from: "FitFusion",
      to:"jerrylife679@gmail.com",
      subject:"Email Verification",
      html:"hello"
    };
  
   const info = await transporter.sendMail(mailOptions);
    console.log('Message sent:', info.messageId);
}

// sendMail()
// module.exports = sendMail;
