require('mongoose');
const User = require('../models/Users');

module.exports = app => {
    app.post('/api/users', (req, res) => {
        const profile = req.body;
        const password = profile.password;
        profile.admin = false;
        console.log('profile:', profile);
        const newUser = new User(profile);
     
        User.register(newUser, password, (err, user) => {
            if (err) {
                res.json({ success: false, message: "Your account could not be saved. Error:", err })
            } else {
                res.json({ success: true, message: 'Your account has been saved' })
            }
        });
    });

    app.get('/api/users/', (req, res) => {
        User.find({}, (err, response) => {
            if (err) {
                console.log('Event error', err.code);
                res.json({ error: err.code });
            }
            res.json(response);
            console.log('allUsers:', response);
        });
    });
}
