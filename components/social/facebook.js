'use strict';

var facebookStrategy = require('passport-facebook').Strategy;
var Config = require('./config');

class Facebook extends Config {
	constructor(clientID, clientSecret) {
		super(
			'facebook',
			facebookStrategy,
			{
				name: 'facebook',
				session: false,
				scope: 'email'
			},
			{
				'clientID': clientID,
				'clientSecret': clientSecret,
				'profileFields': ['displayName', 'emails']
			}
		);
	}
}

module.exports = Facebook;