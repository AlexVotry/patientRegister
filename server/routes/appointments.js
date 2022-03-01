require('mongoose');
const Appointment = require('../models/Appointments');

module.exports = app => {

    app.post('/api/appointments', async (req, res) => {
        const newAppointment = req.body;
        const query = { id: newAppointment.id };
        console.log('query:', query);
        console.log('appointment:', newAppointment);
        Appointment.findOneAndUpdate(query, newAppointment, {
            new: true,
            upsert: true
        },
            (err, response) => {
                if (err) {
                    console.log('appointment error', err);
                    res.send('appointment error');
                };
                res.json(response);
                console.log('response', response);
            })
    });

    app.get('/api/appointments', (req, res) => {
        Appointment.find({}, (err, response) => {
            if (err) {
                console.log('Event error', err.code);
                res.json({ error: err.code });
            }
            res.json(response);
            console.log('all appointments:', response);
        });
    })

    app.get('/api/appointment/:id', (req, res) => {
    });

    app.post('/api/removeappointment/:id', (req, res) => {
    });
}
