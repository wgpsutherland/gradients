// Filename: app.js
define([
	'underscore',
	'jquery',
	'backbone',
	'router'
], function(_, $, Backbone, Router) {

	var initialise = function() {

		Router.initialise();
	};

	return {
		initialise: initialise	
	};
});