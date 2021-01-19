// Imports
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
require('./config/passport')(passport)
const PORT = process.env.PORT || 8000;

// API 
const users = require('./controllers/users');

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Smile, you\'re being watched by the backend engineering team'});
})

app.use('/controllers/users', users);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})