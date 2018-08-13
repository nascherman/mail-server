# mail-service

Mail server for personal projects. Defined with swagger and deployed to Gcloud app engine.

## Functionality

### Contact form

The contact form is for contacting me through my website. It acts as an smpty proxy
using mailgun and. It accepts a POST request and sends a contact email with the current timestamp using handlebars as a templating engine.