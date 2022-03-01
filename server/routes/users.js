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

//     app.get('/api/users/:id', (req, res) => {
//         const id = req.params.id;
//         console.log('api id:', id);
//         db.User.find({ id }, (err, response) => {
//             if (err) {
//                 console.log('Event error', err.code);
//                 res.json({ error: err.code });
//             }
//             res.json(response);
//         });
//     });

//     app.post('/api/users/:id', (req, res) => {
//         const groupId = req.params.id;

//         db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { groups: groupId } }, { new: true })
//             .then(user => {
//                 db.Group.findOneAndUpdate({ _id: groupId }, { $push: { users: req.user._id } }, { new: true })
//                     .populate('users')
//                     .then(group => {
//                         res.json(group);
//                     })
//             })
//     });

//     app.post('/api/removeuser/:id', (req, res) => {
//         console.log('groupId;', req.params.id);
//         const groupId = req.params.id;
//         db.User.update({ _id: req.user._id }, { $pull: { groups: { $in: [groupId] } } })
//             .then(user => {
//                 db.Group.findOneAndUpdate({ _id: groupId }, { $pull: { users: { $in: [req.user._id] } } }, { new: true })
//                     .populate('users')
//                     .then(group => {
//                         console.log('userslen:', group.users.length);
//                         if (group.users.length === 0) {
//                             db.Group.findOneAndDelete({ _id: groupId })
//                                 .then(finalGroups => {
//                                     console.log('empty');
//                                     res.json(finalGroups);
//                                 });
//                         } else {
//                             res.json(group);
//                         }
//                     })
//             })
//     });

}
