'use strict';

var querystring = require('querystring');
var https = require('https');

exports.create = function(apiKey, host) {
	return new MailChimp(apiKey, host);
};

class MailChimp {
	constructor(apiKey, host) {
		this.apiKey = apiKey;
		this.host = host;
	}

	addEmail(email, merge_fields, listId, callback) {
		var payload = createPayload(email, merge_fields);
		
		console.info(payload);

 		var options = createRequestOptions(this.host, listId, this.apiKey, payload.length);
	    var req = https.request(options, function(res) {
	    	res.setEncoding('utf8');
			res.on('data', function (chunk) {
				//console.info('retorno: ' + chunk);
			});
			res.on('end', function() {
				callback(null, res);
			});
		});

		req.on('error', function(err) {
			if (typeof callback === 'function') {
				callback(err, null);
			}
		});

	    req.write(payload);
	    req.end();
	}
}

function createPayload(email, merge_fields) {
	var payload = {
		'status': 'subscribed',
		'email_address': email
	};

	if (merge_fields) {
		payload.merge_fields = merge_fields;
	}
	
	return JSON.stringify(payload);
}

function createRequestOptions(host, listId, apiKey, payloadLength) {
	return {
		'host': host,
		'path': '/3.0/lists/' + listId + '/members',
		'gzip': 'true',
		'method': 'POST',
		'headers': {
			'Authorization': "apikey " + apiKey,
			'Content-Type': 'application/json',
			'accept-encoding' : 'gzip,deflate',
			'Content-Length': payloadLength
		}
    };
}