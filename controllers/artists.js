// EXTERNAL DEPENDENCIES
require('dotenv').config
const express = require('express')

// INTERNAL DEPENDENCIES
const db = require('../models')

// CREATE ROUTER
const router = express.Router()

// GET ROUTE FOR ARTISTS/ALL/:ID
router.get('all/:id', async (req, res) => {
    try {
        const allArtists = await db.Artist.find({
            name: req.params.id
        })
        res.status(200).json({artists: allArtists})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// GET ROUTE FOR ONE ARTIST
router.get('/:id', async (req, res) => {
    try {
        const currentArtist = await db.Artist.findOne({
            _id: req.params.id
        })
        res.status(200).json({artist: currentArtist})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

router.post('/:id', async (req, res) => {
    try {
        const newArtist = await db.Artist.create({
            name: req.body.name
        })
        res.status(200).json({name: newArtist})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

module.exports = router;