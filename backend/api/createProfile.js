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
    picture: Joi.string().regex(/\.(gif|jpe?g)$/)
})

createProfile.post('/', upload.single("picture"), (req, res) => {

    Joi.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        fbLink: req.body.fbLink,
        position: req.body.position,
        picture: req.file.originalname
    },
    validation, function (err, value) {
        if(err){
            console.log(err.toString())
            fs.unlink(path.join(`./backend/public/uploads/`, req.file.filename), (err) => {
                console.log(`error deleteing: ${err}`)
            })
            res.send(err)
        } else{
            const picturePath = `public/uploads/${uuid()}.jpg`;

            fs.rename(appDir+`/public/uploads/${req.file.filename}`, path.join(appDir, picturePath), function(err) {
                if (err) throw err;
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
                        picture: picturePath
                    }},
                    {multi: true}).exec();
                console.log(req.body.hobbies.toString())
            });

            res.send({added: true})
        }
    });
});

module.exports = createProfile;
