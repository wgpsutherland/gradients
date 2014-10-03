// router.js
define([
	'jquery',
	'underscore',
	'backbone',
    'bootstrap',
	'views/HomePage',
	'views/ProfilePage',
    'collections/UserCollection'
], function($, _, Backbone, bootstrap, HomePage, ProfilePage, UserCollection) {

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
            'profile/:id': 'profile'
		}
	});

	var initialize = function() {

		var router = new Router();
        var userCollection = new UserCollection();

		var homePage = new HomePage({
            router: router,
            collection: userCollection
        });

        var profilePage = new ProfilePage({

        });

		var pages = {
			home: homePage,
            profile: profilePage
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
