const express = require('express');
const createProfile = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const appDir = path.dirname(require.main.filename);
const upload = multer({ dest: appDir + '/public/uploads' });
const uuid = require('uuid');
const Joi = require('joi');

const validation = Joi.object().keys({
    firstName: Joi.string().min(2).max(16).regex(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().min(2).max(25).regex(/^[a-zA-Z]+$/).required(),
    fbLink: Joi.string().regex(/(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/),
    position: Joi.string().min(2).max(16).regex(/^[a-zA-Z ]+$/),
})

createProfile.post('/', (req, res) => {

    Joi.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        fbLink: req.body.fbLink,
        position: req.body.position,
    },
    validation, function (err, value) {
        if(err){
            res.send(err)
        } else{
            const Employee = mongoose.model('Employee')
            Employee.update(
                {_id: req.user._id},
                { $set:
                    {firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    position: req.body.position,
                    jobDescription: req.body.jobDescription,
                    hobbies: req.body.hobbies,
                    fbLink: req.body.fbLink,
                    picture: req.body.pictures[Object.keys(req.body.pictures)[0]] 
                }},
                {multi: true}).exec();
            res.send({added: true})
        }
    });
});

module.exports = createProfile;
