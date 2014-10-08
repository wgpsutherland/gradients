// router.js
define([
	'jquery',
	'underscore',
	'backbone',
    'bootstrap',
	'views/HomePage',
	'views/ProfilePage',
    'collections/UserCollection',
    'views/SignupPage',
    'collections/LoginCollection',
    'collections/GradesCollection',
    'models/UserModel',
    'views/AddModulePage',
    'collections/ModuleCollection'
], function($, _, Backbone, bootstrap, HomePage, ProfilePage, UserCollection,
            SignupPage, LoginCollection, GradesCollection, UserModel, AddModulePage, ModuleCollection) {

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
            'profile/:id': 'profile',
            'signup': 'signup',
            'profile/:id/addModule': 'addModule'
		}
	});

	var initialize = function() {

		var router = new Router();
        var userCollection = new UserCollection();
        var loginCollection = new LoginCollection();
        var moduleCollection = new ModuleCollection();

		var homePage = new HomePage({
            router: router,
            collection: loginCollection
        });

        var profilePage = new ProfilePage({
            router: router
        });

        var signupPage = new SignupPage({
            router: router,
            collection: userCollection
        });

        var addModulePage = new AddModulePage({
            router: router,
            moduleCollection: moduleCollection
        });

		var pages = {
			home: homePage,
            profile: profilePage,
            signup: signupPage,
            addModule: addModulePage
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
