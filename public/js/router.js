// router.js
define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});

	var initialize = function() {

		var router = new Router();

		var pages = {

		};

		router.on('route', function(pageName) {

			if (!$('.page > [data-name="' + pageName + '"]').length) { // checks if the page has been rendered before
			    pages[pageName].render();
			    $('.page').append(pages[pageName].$el.attr('data-name', pageName));
			}

			_.each(pages, function(page, name) {
			    page.$el.toggle(name===pageName);
			});
		});

		Backbone.history.start({
			pushState: false
		});
	}

	return {
		initialize: initialize
	}
});
