const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = mongoose.model('Employee');

const google = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_API_SECRET,
	callbackURL: `${process.env.DOMAIN}/auth/google/callback`,
};

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

passport.use(new GoogleStrategy({
	clientID: google.clientID,
	clientSecret: google.clientSecret,
	callbackURL: google.callbackURL
}, (accessToken, refreshToken, profile, done) => {
	User.findOne({googleId: profile.id}, (err, user) => {
		if (err)
			return done(err);
		if (user)
			return done(null, user);
		else {
			const user = new User({
				googleId: profile.id,
				token: accessToken,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value
			});
			user.save()
				.then(() => done(null, user))
				.catch((err) => {
					console.log(err);
					done(err);
				});
		}
	})
}));
