const handler = require('./handler');

module.exports = {
    apply: app => {
        app.get('/contact', handler.getContactToken);
        app.post('/contact', handler.sendContact);
        app.post('/contact/trial', handler.requestTrial);
    }
};