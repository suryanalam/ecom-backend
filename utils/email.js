const config = require('../config/config');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;

//credentials:
const GMAIL_APP_USER = config.GMAIL_APP_USER;
const GMAIL_APP_PASSWORD = config.GMAIL_APP_PASSWORD;

let mailTransporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        user: GMAIL_APP_USER,
        pass: GMAIL_APP_PASSWORD
    }
});

async function sendEmail(to, subject, emailBody){

    let {name, desc1, desc2} = emailBody;

    try{
        let htmlTemplate = '';

        if(subject == 'Your are registered on GoKart website'){
            htmlTemplate = await fs.readFile('./utils/signupEmail.html', 'utf-8');
        }
        else if(subject == 'OTP for Reset Password' || subject == 'Password Reset Successfully'){
            htmlTemplate = await fs.readFile('./utils/passwordReset.html', 'utf-8');
        }

        htmlTemplate = htmlTemplate.replaceAll('{name}', name);
        htmlTemplate = htmlTemplate.replaceAll('{desc1}', desc1);
        htmlTemplate = htmlTemplate.replaceAll('{desc2}', desc2);

        const mailDetails = {
            from: 'suryanalam3011@gmail.com',
            to,
            subject,
            html: htmlTemplate
        }
    
        try{
            let emailSent = await mailTransporter.sendMail(mailDetails);
            if(emailSent){
                console.log('Email sent successfully to ', to);
            }
        }catch(err){
            console.log('Error while sending email', err);
        } 

    }catch(err){
        console.log('Error while generating email', err);
    }

}

module.exports = sendEmail;