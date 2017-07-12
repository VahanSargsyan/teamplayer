const express = require('express')
const mongoose = require('mongoose')
const auth = express.Router()

auth.get('/user', (req, res) => {
    let activeUrl
    if (req.user && !req.user.position)
        activeUrl = 'createProfile'
    else if (req.user && req.user.position && req.user.trainingStep != 'finished')
        activeUrl = 'training'
    else
        activeUrl = 'team'

    const user = (typeof req.user != 'undefined') ? req.user : null
    res.status(200).send({user, activeUrl})
})

module.exports = auth
