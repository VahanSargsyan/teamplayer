const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const api = require('./api');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Joi = require('joi');

require('./models/index').initialize();
require('dotenv').config();
require('./passport');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/teamplayer');

const PORT = 8081;
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'keyboard cat',
	cookie: {},
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true, origin: true}));

app.get('/auth/google', passport.authenticate('google', { scope: [
	'https://www.googleapis.com/auth/plus.login',
	'https://www.googleapis.com/auth/userinfo.email'
] }));

app.get('/auth/google/callback', passport.authenticate('google', {
	successRedirect: '/profile', failureRedirect: '/auth/google' }));

app.use('/api', api);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});






app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
