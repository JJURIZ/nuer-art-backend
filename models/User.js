const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true,
    },
    addressLine1: {
        type: String,
        required: false
    },
    addressLine2: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    },
    painting: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Painting'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);