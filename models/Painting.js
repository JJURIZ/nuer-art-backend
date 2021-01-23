//IMPORT MONGOOSE
const mongoose = require('mongoose')

//CREATE VARIABLE FOR SCHEMA SHORTCUT
const Schema = mongoose.Schema

const paintingSchema = new Schema({
    url: {
        type: String
    },
    title: {
        type: String,
        default: 'Untitled',
        required: true
    },
    price: {
        type: String,
        dafualt: 0,
        required: false
    },
    qty: {
        type: Number,
        dafault: 1,
        required: false
    },
})

module.exports = Painting = mongoose.model('Painting', paintingSchema)