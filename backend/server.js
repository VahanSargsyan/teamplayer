const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const Joi = require('joi');

require('./models/index').initialize();
require('dotenv').config();
require('./passport');
const api = require('./api');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB);

const PORT = process.env.PORT;
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
	'https://www.googleapis.com/auth/userinfo.email',
		'https://www.googleapis.com/auth/userinfo.profile'
]}));

app.get('/auth/google/callback', passport.authenticate('google', {
	successRedirect: '/loginSuccess', failureRedirect: '/auth/google' }));

app.get('/loginSuccess', (req, res)=>{
	if(req.user && !req.user.position)
		res.redirect('/createProfile')
	else if(req.user && req.user.trainingStep != 'finished')
		res.redirect('/training')
	else
		res.redirect('/team')
})

app.get('/logout', (req, res) => {
	req.session.destroy()
	res.redirect('/')
})

app.use('/api', api);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
