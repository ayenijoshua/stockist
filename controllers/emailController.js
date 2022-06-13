const nodemailer = require('nodemailer')
const config = require('config')
const mailgun = require("mailgun-js");

let EmailController = {

    transporter(){
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: config.get('MAIL_USERNAME'),
              pass: config.get('MAIL_PASSWORD'),
              clientId: config.get('OAUTH_CLIENTID'),
              clientSecret: config.get('OAUTH_CLIENT_SECRET'),
              refreshToken: config.get('OAUTH_REFRESH_TOKEN')
            }
        })
    },

     mailOptions (data) {
        return{
            from: 'noreply@lilonghero.com',
            to: data.recipient,
            subject: data.subject,
            html: data.html
        }
       
      },

       async send(data){
        let sent = await EmailController.transporter().sendMail(EmailController.mailOptions(data));
        console.log(sent.messageId)
        return sent.messageId ? true : false
      },

      async sendViaMailgun(data)
      {
        const DOMAIN = config.get('DOMAIN_NAME');
        const mg = mailgun({apiKey: config.get('MAILGUN_API_KEY'), domain: 'https://api.mailgun.net/v3/lilonghero.com'});
        const emailData = {
            from: 'Lilong Hero <support@lilonghero.com>',
            to: data.recipient,
            subject: data.subject,
            html: data.html
        };
        await mg.messages().send(emailData, function (error, body) {
            console.log(body);
        });
        // var mg = require('nodemailer-mailgun-transport');
        // var auth = {
        //     auth: {
        //       api_key: 'key-d0071eadf7e5d4c73432ac2cdae16c4e',
        //       domain: 'https://api.mailgun.net/v3/lilonghero.com'
        //     }
        //   }
        // var nodemailerMailgun = nodemailer.createTransport(mg(auth));
        var transporter = nodemailer.createTransport( {
            service:  'Mailgun',
            auth: {
             user: 'postmaster@lilonghero.com',
             pass: 'key-d0071eadf7e5d4c73432ac2cdae16c4e'   
            }
        });
        console.log('here')
        let sent = await nodemailerMailgun.sendMail(emailData);
        if(sent.messageId){
            return true
        }
        return false
      }

}

module.exports = EmailController
