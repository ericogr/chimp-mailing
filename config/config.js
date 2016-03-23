var path = require('path'),
		rootPath = path.normalize(__dirname + '/..'),
		env = process.env.NODE_ENV || 'development';

console.info('environment: ' + env);

var config = {
	//todo: don't forget to clean these variable before put in github
	development: {
		root: rootPath,
		app: {
			name: 'chimp-mailing'
		},
		port: 9000,
		facebook: {
			clientID: '<client-id>',
			clientSecret: '<api-key>'
		},
		mailChimp: {
			apiKey: '<api-key>',
			host: '<host>',
			listId: 'b045c22232',
			merge_fields: '{"FNAME": "name"}' //lista correspondencia entre os campos criados no mailchimp e os recebidos pelo facebook
		},
		redirectSuccess: 'http://xpto.com.br/ok'
	},

	production: {
		root: rootPath,
		app: {
			name: 'chimp-mailing'
		},
		port: 9000,
		facebook: {
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		},
		mailChimp: {
			apiKey: process.env.MAILCHIMP_API_KEY,
			host: process.env.MAILCHIMP_HOST,
			listId: process.env.MAILCHIMP_LIST_ID,
			merge_fields: process.env.MAILCHIMP_MERGE_FIELDS //lista correspondencia entre os campos criados no mailchimp e os recebidos pelo facebook
		},
		redirectSuccess: process.env.REDIRECTION_SUCCESS
	}
};

module.exports = config[env];