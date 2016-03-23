var express = require('express'),
	router = express.Router(),
	config =require('../../config/config');

module.exports = function (app) {
  app.use('/', router);
  app.use('/success', router);
};

router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Cadastro de e-mail'
	});
});

router.get('/success', function (req, res, next) {
	if (config.redirectSuccess) {
		res.redirect(config.redirectSuccess);
	}
	else {
		res.render('success', {
			title: 'E-mail cadastrado com sucesso!'
		});
	}
});
