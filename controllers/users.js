// IMPORT DEPENDENCIES
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// MODELS
const db = require('../models');

// CREATE ROUTER
const router = express.Router();

//CREATE JSON WEB TOKEN
const JWT_SECRET = process.env.JWT_SECRET;

// POST - USER SINGUP
router.post('/signup', async (req, res) => {
    try {
        // FIND USER BY EMAIL
        const currentUser = await db.User.findOne({
            email: req.body.email
        })
        if (currentUser) {
            // SEND 400 RESPONSE IF EMAIL IN USE
            return res.status(400).json({msg: "An account with this email address already exists"})
        } else {
            // CREATE NEW USER IF EMAIL ADDRESS NOT ON FILE
            const newUser = new db.User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                addressLine1: req.body.addressLine1,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            })
            // SALT PASSWORD
            bcrypt.genSalt(8, (error, salt) => {
                if (error) throw error
                // HASH PASSWORD WITH SALT
                bcrypt.hash(newUser.password, salt, async (error, hash) => {
                    try {
                        if (error) throw Error
                        // CHANGE PASSWORD TO HASH VERSION
                        newUser.password = hash
                        // SAVE USER WITH HASHED PASSWORD
                        const createdUser = await newUser.save()
                        res.status(200).json({
                            user:createdUser
                        })
                    } catch(error) {
                        res.status(400).json({msg: error})
                    }
                })
            })
        }
    } catch(error) {
        res.status(400).json({msg: error})
    }
})


// POST ROUTE FOR USER LOGIN
router.post('/login', async (req, res) => {
    try {
        // GET EMAIL AND PASSWORD
        const email = req.body.email
        const password = req.body.password
        // FIND USER BY EMAIL
        const currentUser = await db.User.findOne({email})
        if (!currentUser) {
            // 400 RESPONSE - USER DOES NOT EXSIST
            res.status(400).json({msg: "User not found"})
        } else {
            // LOG IN USER
            const isMatch = await bcrypt.compare(password, currentUser.password)
            // CHECK PASSWORD MATCH
            if (isMatch) {
                // CREATE TOKEN PAYLOAD IF MATCH
                const payload = {
                    id: currentUser.id,
                    email: currentUser.email,
                    name: currentUser.name
                }
                // SIGN TOKEN TO FINALIZE LOGIN
                jwt.sign(payload, JWT_SECRET, {expiresIn: '1m'}, (error, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                })
            } else {
                // 400 RESPONSE - NO MATCH
                return res.status(400).json({msg: 'Password is incorrect'})
            }
        }
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// GET ROUTE FOR USERS/:ID (PRIVATE)
router.get('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const currentUser = await db.User.findOne({
            _id: req.params.id
        })
        res.status(200).json({user: currentUser})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// PUT ROUTE FOR USERS/:ID (PRIVATE)
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const { newName } = req.body
    try {
        const updatedUser = await db.User.updateOne(
            {_id: req.params.id},
            {$set: {name: newName}}
        )
        res.status(200).json({user: updatedUser})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// DELETE USER ACCOUNT
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        await db.User.deleteOne({_id: req.params.id})
        res.status(200).json({msg: "Account deleted"})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// EXPORT ROUTER
module.exports = router;