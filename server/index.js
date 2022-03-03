const socketio = require('socket.io');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieSession = require('cookie-session');
const keys = require('./secrets');
const app = express();
const PORT = process.env.PORT || 8181;
const expTime = 30 * 24 * 60 * 60 * 1000; // 30 days
require('./models');
app.use(cors());

const uri = keys.mongoURI;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cookieSession({
        maxAge: expTime,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use account model for authentication
const User = require('./models/Users');
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(uri);

const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//     cors: { origin: 'http://localhost:3000' }
// });

require('./routes/users')(app);
require('./routes/appointments')(app);
require('./routes/auth')(app);

server.listen(PORT, () => console.log(`Master listening on ${PORT}...`))
// io.on('connection', socket => {
//     socketMain(io, socket);
// });

