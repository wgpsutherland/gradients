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
    'collections/ModuleCollection',
    'collections/UserModulesCollection',
    'libs/getCookie',
    'collections/InstitutionsCollection',
    'collections/CourseCollection'
], function($, _, Backbone, bootstrap, HomePage, ProfilePage, UserCollection,
            SignupPage, LoginCollection, GradesCollection, UserModel,
            AddModulePage, ModuleCollection, UserModulesCollection, getCookie, InstitutionsCollection, CourseCollection) {

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
        var userModulesCollection = new UserModulesCollection();
        var institutionsCollection = new InstitutionsCollection();
        var courseCollection = new CourseCollection();

		var homePage = new HomePage({
            router: router,
            collection: loginCollection
        });

        var profilePage = new ProfilePage({
            router: router,
            userModulesCollection: userModulesCollection
        });

        var signupPage = new SignupPage({
            router: router,
            userCollection: userCollection,
            institutionsCollection: institutionsCollection,
            courseCollection: courseCollection
        });

        var addModulePage = new AddModulePage({
            router: router,
            moduleCollection: moduleCollection,
            userModulesCollection: userModulesCollection
        });

		var pages = {
			home: homePage,
            profile: profilePage,
            signup: signupPage,
            addModule: addModulePage
		};

		router.on('route', function(pageName, stuff) {

            // if the page requires login and the cookie user id is not correct then redirect back to the homepage
            if((pageName=="profile" || pageName=="addModule") && (stuff[0] != $("user_id").getCookie())) {

                router.navigate('#', {trigger: true});
            } else if ((pageName=="home" || pageName=="signup") && ($("user_id").getCookie() != "")){

                router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
            } else {

                if (!$('.page > [data-name="' + pageName + '"]').length) { // checks if the page has been rendered before

                    pages[pageName].render();
                    $('.page').append(pages[pageName].$el.attr('data-name', pageName));
                }

                _.each(pages, function(page, name) {
                    page.$el.toggle(name===pageName);
                });
            }
		});

		Backbone.history.start({
			pushState: false
		});
	}

	return {
		initialize: initialize
	}
});
