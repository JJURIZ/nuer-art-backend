// EXTERNAL DEPENDENCIES
require('dotenv').config
const express = require('express')

// INTERNAL DEPENDENCIES
const db = require('../models')

// CREATE ROUTER
const router = express.Router()

// GET ROUTE FOR PAINTING/ALL/:ID
router.get('all/:id', async (req, res) => {
    try {
        const allPainting = await db.Painting.find({
            name: req.params.id
        })
        res.status(200).json({paintings: allPainting})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

// GET ROUTE FOR ONE PAINTING
router.get('/:id', async (req, res) => {
    try {
        const currentPainting = await db.Painting.findOne({
            _id: req.params.id
        })
        res.status(200).json({painting: currentPainting})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})


router.post('/create', async (req, res) => {
    try {
        const newPainting = await db.Painting.create({
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            qty: req.body.qty

        })
        res.status(200).json({name: newPainting})
    } catch(error) {
        res.status(400).json({msg: error})
    }
})

module.exports = router;