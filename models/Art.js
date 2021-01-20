//IMPORT MONGOOSE
const mongoose = require('mongoose')

//CREATE VARIABLE FOR SCHEMA SHORTCUT
const Schema = mongoose.Schema

const artSchema = new Schema({
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
    quantity: {
        type: Number,
        dafault: 1,
        required: false
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Artist'
    }

})