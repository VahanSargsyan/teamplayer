const express = require('express');
const createProfile = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Joi = require('joi');

const Employee = mongoose.model('Employee');

const validation = Joi.object().keys({
    firstName: Joi.string().min(2).max(16).regex(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().min(2).max(25).regex(/^[a-zA-Z]+$/).required(),
    fbLink: Joi.string().regex(/^(?:(?:http|https):\/\/)?(?:www.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com\/[a-zA-Z\.0-9]+|me\/[a-zA-Z\.0-9]+)/).allow(''),
    position: Joi.string().min(2).max(16).regex(/^[a-zA-Z ]+$/),
    gender: Joi.string().required()
})

createProfile
	.get('/', (req, res) => {
		Employee.find()
		.then(data => {
			res.json(data)
		})
	})
	.post('/', (req, res) => {
		Joi.validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			position: req.body.position,
			fbLink: req.body.fbLink,
			position: req.body.position,
			gender: req.body.gender
		},
		validation, function (err, value) {
			if(err){
				res.send(err)
			} else{

				if(req.body.fbLink.substring(0, 12) !== 'https://www.' && req.body.fbLink.substring(0, 12) !== ''){
					req.body.fbLink='https://www.'+req.body.fbLink
				}
				else if(req.body.fbLink == ''){
					req.body.fbLink = null
				}
				Employee.update(
					{_id: req.user._id},
					{ $set:
						{firstName: req.body.firstName,
						lastName: req.body.lastName,
						position: req.body.position,
						jobDescription: req.body.jobDescription,
						hobbies: req.body.hobbies,
						fbLink: req.body.fbLink,
						picture: req.body.picture,
						education: req.body.education,
						gender: req.body.gender,
						bio: req.body.bio
					}},
					{multi: true}).exec();
				res.send({added: true})
			}
		});
	});

module.exports = createProfile;
