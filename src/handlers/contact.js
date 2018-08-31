const AppError = require('../utils/app-error');
const Mailer = require('../utils/mailer');
const Templater = require('../utils/templater');

const nameRegex = new RegExp(/^.{5,}/);
const emailRegex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/);
const contentRegex = new RegExp(/^.{1,}/);
const phoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);

const post = (req, res, next) => {
    // initialize optional parameters
    const {name, email, content, phone = ''} = req.body;

    const formErrors = findFormErrors({name, email, content, phone});

    if (!formErrors.length) {
        Mailer.send({
            from: 'no-reply@mail.nickscherman.com',
            to: 'naschermanweb@gmail.com',
            subject: 'Contact form email',
            html: Templater.createContact({name, email, content, phone})
        }, (err, resp) => {
            if (err) {
                next(err);
            } else {
                res.sendStatus(204);
            }
        });
    } else { // validation errors
        next(new AppError(400, formErrors));
    }

};

function findFormErrors(form) {
    const {name, email, content, phone = ''} = form;

    const errors = [];

    if (!nameRegex.test(name)) {
        errors.push('Invalid name must be gt 5 characters');
    }

    if (!emailRegex.test(email)) {
        errors.push('Invalid email must be a valid email format');
    }

    if (!contentRegex.test(content)) {
        errors.push('Invalid content must be provided')
    }

    if (phone.length && !phoneRegex.test(phone)) {
        errors.push('Invalid phone number');
    }

    return errors;
}

module.exports = {
    post,
    options: (req, res, next) => {
        res.sendStatus(204);
    }
};