const express = require('express');

const api = express.Router();

api.use('/login', require('./login'));
api.use('/createProfile', require('./createProfile'));
api.use('/explore', require('./explore'));
api.use('/training', require('./training'));
api.use('/explore', require('./explore'));

module.exports = api;