const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, text, html) => {
   
 

    const message = {
        to: to,
        from:process.env.SENDGRID_FROM,
        subject: subject,
        text: text,
        html: html
    };
    

    sgMail.send(message)
.then(response => console.log('Email sent..'))
.catch((error) => console.log('error message 1: ', error.message))
}

module.exports=  sendEmail 


