const nodemailer = require('nodemailer');
const { parse } = require('querystring');

module.exports = async function (req, res) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const formData = parse(body);
        const { name, email, subject, message } = formData;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MY_EMAIL,
                pass: process.env.MY_PASSWORD,
            }
        });
    
        const mailOptions = {
            from: email,
            to: process.env.MY_EMAIL,
            subject,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        try {
            const mail = await transporter.sendMail(mailOptions);
            console.log('Email sent: ' + mail.response);
            res.status(200).send('Email sent successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
    });
};