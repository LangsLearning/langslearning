const passport = require('passport');

module.exports = {
    apply: (mongoClient, app) => {
        const handler = require('./handler')(mongoClient);

        app.get('/admin/trials', passport.authenticate('basic'), handler.getTrials);
        app.post('/admin/trials', passport.authenticate('basic'), handler.registerTrial);
        app.post('/admin/trials/level', passport.authenticate('basic'), handler.setLevel);
        app.get('/admin/trials/:id/remove', passport.authenticate('basic'), handler.removeTrial);
    }
}