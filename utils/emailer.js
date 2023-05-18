const nodemailer = require('nodemailer');

// Create a transporter for MailDev
const transporter = nodemailer.createTransport({
  host: 'maildev', // Use the service name defined in the docker-compose.yml file
  port: 1025, // The SMTP port exposed by MailDev
  ignoreTLS: true, // Disable TLS for MailDev
});

const sendActivationEmail = async (email, activationLink) => {
  console.log({email, activationLink});
  try {
    const mailOptions = {
      from: 'no-reply@email.xyz',
      to: email,
      subject: 'Activate your account',
      text: `Please click the following link to activate your account: ${activationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    });
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw new Error('Failed to send activation email');
  }
};

module.exports = {
  sendActivationEmail,
};
