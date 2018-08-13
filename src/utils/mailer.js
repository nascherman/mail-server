const path = require('path');
const mailgun = require('mailgun-js')({
    apiKey: process.env.API_KEY,
    domain: process.env.MAIL_DOMAIN
});

class Mailer {
    send(data, cb) {
        mailgun.messages().send(data, (err, body) => {
            cb(err, body);
        })
    }
}

// Mailer singleton
module.exports = new Mailer();