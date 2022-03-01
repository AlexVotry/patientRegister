const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    phone: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: String,
    imageId: String,
    admin: Boolean,
});

User.plugin(passportLocalMongoose, {usernameField: "email"});

module.exports = mongoose.model('User', User);