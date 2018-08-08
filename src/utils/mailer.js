const fs = require('fs');
const path = require('path');
const mailgun = require('mailgun-js')({
    apiKey: fs.readFileSync(path.resolve(__dirname, '../config/api-key.txt'), {encoding: 'utf-8'}),
    domain: 'mail.nickscherman.com'
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