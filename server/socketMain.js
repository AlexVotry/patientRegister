const mongoose = require('mongoose');
const keys = require('./secrets');
const uri = keys.mongoURI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = require('./models');

function socketMain(io, socket) {
    socket.on('initJoin', async newPatient => {
        const currentUser = await addPatient(newPatient);
        const currentCalender = await getAppts();
        socket.emit('initUser', { currentUser: localState, teams });
    });


    socket.on('newMessage', messages => {
        const { team } = messages;
        if (teams[team].length > 1) {
            io.to(team).emit('updateMessage', messages);
        } else {
            io.to(teamGroup).emit('updateMessage', messages);
        }
    });
}
const addPatient = async user => {
    await db.User.findOneAndUpdate(
        { name: user.name, password: user.password },
        user,
        { upsert: true },
        (err, doc) => {
            if (err) throw err;
            else {
                patient.push(user);
            }
        })

    return user;
}

module.exports = socketMain;
