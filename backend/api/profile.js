const express = require('express');
const mongoose = require('mongoose');
const profile = express.Router();
const Joi = require('joi');
const Employee = mongoose.model('Employee');

const validation = Joi.object().keys({
    firstName: Joi.string().min(2).max(16).regex(/^[a-zA-Z ]+$/),
    lastName: Joi.string().min(2).max(25).regex(/^[a-zA-Z ]+$/),
    fbLink: Joi.string().regex(/(?:(?:http|https):\/\/)?(?:www.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com\/[a-zA-Z\.0-9]+|me\/[a-zA-Z\.0-9]+)/),
    position: Joi.string().min(2).max(16).regex(/^[a-zA-Z ]+$/),
})

profile.get('/', async (req, res) => {
    const _id = req.user._id;
    try {
        const data = await Employee.findOne({_id: _id}, { firstName: 1,
                                            lastName: 1,
                                            gender: 1,
                                            bio: 1,
                                            email: 1,
                                            picture: 1,
                                            position: 1,
                                            jobDescription: 1,
                                            education: 1,
                                            hobbies: 1,
                                            fbLink: 1}).exec();
        res.status(200).json(data);
    } catch(e) {
        console.log('Error: ', e);
        res.status(500).json({error: "Something went wrong"});
    }
  
});

profile.put('/', (req, res) => {
    Joi.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        fbLink: req.body.fbLink
    }, validation, async (err, value) => {
        if(err){
            res.status(400).json({error: "Invalid input"});
        } else {
            const _id = req.user._id;
            try {
                const result = await Employee.update({_id}, {$set: req.body});
                res.status(200).json(result);
            } catch(e) {
                res.status(500).json({error: "Something went wrong"});
            }
        }
    });
});

profile.post('/', async (req, res) => {
    const _id = req.user._id;
    try {
        const result = await Employee.update({_id}, { $set: req.body}, {multi: true, upsert: true}).exec();
        const data = await Employee.findOne({_id: _id}, { hobbies: 1 }).exec();
        res.status(200).json({hobbies: data.hobbies});
    } catch(e) {
        res.status(500).json({error: "Something went wrong"});
    }
});

module.exports = profile;