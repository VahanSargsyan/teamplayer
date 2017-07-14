const express = require('express');

const api = express.Router();

api
	.use('/auth', require('./auth'))
	.use('/admin', require('./admin'))
	.use('/login', require('./login'))
	.use('/createProfile', require('./createProfile'))
	.use('/explore', require('./explore'))
	.use('/training', require('./training'))
	.use('/explore', require('./explore'))
	.use('/profile', require('./profile'))
	.use('/autocomplete', require('./autocomplete'))
	.use('/quiz', require('./quiz'));

module.exports = api;
