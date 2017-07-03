const express = require('express');
const mongoose = require('mongoose');
const training = express.Router();

training.get('/', async (req, res) => {
    const { _id } = req.user;

    const Employee = mongoose.model('Employee');

    try {
        const employees = await Employee.find({_id: {$ne: _id}}, { firstName: 1,
                                                    lastName: 1,
                                                    picture: 1,
                                                    position: 1,
                                                    hobbies: 1,
                                                    jobDescription: 1 }).exec();

        const trainingStep = await Employee.findOne({_id}, {_id: 0, trainingStep: 1}).exec();

        res.status(200).json({employees, trainingStep});
    } catch(e) {
        res.status(500).json({error: "Something went wrong"});
    }
});

training.put('/step', async (req, res) => {
    const { _id } = req.user;
    const trainingStep = req.body.trainingStep;

    const Employee = mongoose.model('Employee');
    
    try {
        const result = await Employee.update({_id}, {$set: {trainingStep}}, {upsert: true}).exec();
        res.status(200).json(req.body);
    } catch(e) {
        res.status(500).json({error: "Something went wrong"});
    }
});

module.exports = training;