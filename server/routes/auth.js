require('mongoose');
const passport = require('passport');
const User = require('../models/Users');

module.exports = app => {
    app.post('/api/login', passport.authenticate('local'), (req, res) => {
        const email = req.body.email;
        User.find({email}, (err, response) => {
            if (err) {
                console.log('Event error', err.code);
                res.json({ error: err.code });
            }
            res.json(response[0]);
        });
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
}