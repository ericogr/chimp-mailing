var authentication = require('../components/social/authentication');
var facebookConfiguration = require('../components/social/facebook');
var MailChimp = require('../components/mailchimp');

module.exports = function(app, config) {
	var mailChimp = MailChimp.create(config.mailChimp.apiKey, config.mailChimp.host);
	var socialAuthentication = authentication.create(app, '/login/');
	
	socialAuthentication.configure(
		new facebookConfiguration(
			config.facebook.clientID,
			config.facebook.clientSecret
		),
		function(err, profile) {
			console.info('facebook: ', err, profile);

			if (!err) {
				mailChimp.addEmail(
					profile.email,
					mergeFields(config.mailChimp.merge_fields, profile),
					config.mailChimp.listId,
					function(err, res) {
						if (err) {
							console.err('Error processing mailchimp: ' + err);
						}
						else {
							console.info('mailchimp status: ', res.statusCode);
						}
					}
				);
			}
			else {
				console.error(err);
			}
		}
	);
}

function mergeFields(merge_fields, profile) {
	if (merge_fields) {
		var mergeObject = JSON.parse(merge_fields);
		var ret = {};

		for (var chave in mergeObject) {
			ret[chave] = //profile[mergeObject[chave]];
				encodeURIComponent(profile[mergeObject[chave]]);
		}

		return ret;
	}

	return null;
}