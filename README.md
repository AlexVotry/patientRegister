# Patient scheduler
To download this app:

`git clone https://github.com/AlexVotry/patientRegister.git`

in your terminal, cd into client folder and type `npm install`

then cd into the server folder and type `npm install`

then type `npm start` in both client and server.

this app connects to a mongodb in the cloud.

User can login or register.  The login is authenticated with passport-local-mongoose. 

You can login as an administrator (email: drwho@email.com, pw: secret),
or you can register using whatever info you like.

You will be sent to the calendar and you can choose when to make an appointment.
this app fulfills these requirements:
Requirements​:
1. The patient has to submit their name, date of birth, phone number, email, address, photo (driver license) and appointment time to register.
2. The admin should be able to view all the registered patients from the website.

This was an exercise that I needed to finish in a couple days after work. 
Things I would've liked to do:
testing,
error handling,
validation of inputs,
editing and removing appointments,
editing and removing patients,
admins ability to add other admins,
use websocket for scheduling to be real-time,


