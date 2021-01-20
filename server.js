// IMPORTS
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport)
const PORT = process.env.PORT || 8000;

// INTERNAL CONTROLLERS
const users = require('./controllers/users');

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())

// USE INTERNAL CONTROLLERS
app.use('/controllers/users', users);

// HOME ROUTE
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Nuer Art Backend'});
})

// SERVER LISTENING ON PORT
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

module.exports = server
