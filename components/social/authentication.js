'use strict';

exports.create = function(app, basepath) {
	return new Authentication(
		app,
		basepath || '/');
}

class Authentication {
	constructor(app, basepath) {
		this.app = app;
		this.basepath = basepath;
		this.passport = require('passport');

		init(app, this.passport);
	};

	configure(provider, callback) {
		addCallbackURL(provider, this.basepath, provider.name);
		addAuthenticationURL(this.app, this.passport, this.basepath, provider.name, provider.options);
		configurePassport(this.passport, provider.strategy, provider.name, provider.authentication, provider.converter, callback);
		configureCallbackURL(this.app, this.passport, this.basepath, provider.name);
	};
}

function init(expressApp, passport) {
	expressApp.use(passport.initialize());

	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});
};

function addCallbackURL(provider, basepath, providerName) {
	provider.authentication['callbackURL'] = basepath + providerName + '/callback';
}

function addAuthenticationURL(expressApp, passport, basepath, providerName, options) {
	expressApp.get(basepath + providerName, passport.authenticate(providerName, options));
}

function configurePassport(passport, strategy, providerName, authentication, converter, callback) {
	passport.use(
		providerName,
		new strategy(authentication,
	    	function(access_token, refresh_token, profile, done) {
	    		var basicProfile = converter(profile);

	    		if (typeof callback === 'function') {
	    			callback(null, basicProfile);
	    		}

	    		return done(null, basicProfile);
	    	}
	    )
    );
}

function configureCallbackURL(expressApp, passport, basepath, providerName) {
	expressApp.get(basepath + providerName + '/callback', function(req, res, next) {
		passport.authenticate(providerName, function(err, user, info) {
			if (err) {
				return next(err);
			}
			
			if (!user) {
				return res.redirect('/error');
			}

			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}

				res.redirect('/success');
			});
		})(req, res, next);
	});
}

function onSuccessCallback(profile) {

}