const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Appointment = new Schema({
    id: String,
    name: String,
    phone: String,
    start: String,
    end: String,
    text: String,
});

module.exports = mongoose.model('Appointment', Appointment);