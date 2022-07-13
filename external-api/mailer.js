const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");
const config = require('config')


module.exports = mailer  = {

    mailersend : function(params){
        new MailerSend({
            api_key: config.get('MAILER_SEND_API_TOKEN'),
        }).send(params)
    },

    emailHtmlParams : function(recipients,subject,html){
        return new EmailParams()
        .setFrom("support@lilonghero.com")
        .setFromName("Lilonghero")
        .setRecipients(recipients)
        .setSubject(subject)
        .setHtml(html)
    },

    emailTextParams : function(recipients,subject,text){
        let newRecipients = recipients.map(function(ele){
            return new Recipient(ele, "Recipient")
        })
        return new EmailParams()
        .setFrom("support@lilonghero.com")
        .setFromName("Lilonghero")
        .setRecipients(newRecipients)
        .setSubject(subject)
        .setText(text);
    }

}
