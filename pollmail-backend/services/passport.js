const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
		(accessToken, refreshToken, profile, done) => {
			User.findOneAndDelete({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						console.log('existing user');
						console.log(existingUser.googleId, existingUser.firstName, existingUser.surname);
						done(null, existingUser);
					} else {
						console.log('not existing user');
						new User({
							googleId: profile.id,
							firstName: profile.name.givenName,
							surname: profile.name.familyName
						}).save()
							.then(user => done(null, user));
					}
				})
		})
);