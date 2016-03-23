'use strict';

class Config {
	constructor(name, strategy, options, authentication, converter) {
		this.name = name;
		this.strategy = strategy;
		this.options = options;
		this.authentication = authentication;
		this.converter = converter || basicProfileConverter;
	}

	name() {
		return this.name;
	}

	strategy() {
		return this.strategy;
	}

	options() {
		return this.options;
	}

	authentication() {
		return this.authentication;
	}

	converter() {
		return this.converter;
	}
}

module.exports = Config;

function basicProfileConverter(profile) {
	return {
		'identity': profile.id,
		'name': profile.displayName,
		'email': (profile.emails ? profile.emails[0].value : null)
	};
};