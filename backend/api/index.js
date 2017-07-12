const express = require('express');

const api = express.Router();

api
	.use('/auth', require('./auth'))
	.use('/login', require('./login'))
	.use('/createProfile', require('./createProfile'))
	.use('/explore', require('./explore'))
	.use('/training', require('./training'))
	.use('/explore', require('./explore'))
	.use('/profile', require('./profile'))
	.use('/quiz', require('./quiz'));

module.exports = api;