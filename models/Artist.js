// CREATE VARIABLE FOR SCHEMA SHORTCUT
const mongoose = require('mongoose');
const Schema = mongoose.Schema

//CREATE ARTIST SCHEMA
const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = Artist = mongoose.model('Artist', artistSchema)
