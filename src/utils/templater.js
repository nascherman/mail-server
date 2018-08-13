const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const contactForm = fs.readFileSync(
    path.resolve(__dirname, '../templates/contact.hbs'),
    {encoding: 'utf-8'}
);

class Templater {
    createContact({name, email, content, phone}) {
        const template = Handlebars.compile(contactForm);

        return template({name, email, content, phone, time: new Date().toString()});
    }
}

module.exports = new Templater();