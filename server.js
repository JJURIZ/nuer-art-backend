// EXTERNAL DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

// INTERNAL DEPENDENCIES
require('./configurations/passport')(passport)

// INTERNAL CONTROLLERS
const users = require('./controllers/users');
const artists = require('./controllers/artists')

// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize())

// USE INTERNAL CONTROLLERS
app.use('/users', users);
app.use('/artists', artists);

// HOME ROUTE
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Nuer Art Backend'});
})

// CREATE PORT
const PORT = process.env.PORT || 8000;

// SERVER LISTENING ON PORT
const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

module.exports = server
