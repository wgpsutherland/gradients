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
    'models/UserModel',
    'views/AddModulePage',
    'collections/ModuleCollection',
    'collections/UserModulesCollection',
    'libs/getCookie',
    'collections/InstitutionsCollection',
    'collections/CourseCollection',
    'views/LoggedOutPage',
    'collections/GradesCollection',
    'views/AddGradePage',
    'collections/AssignmentsCollection'
], function($, _, Backbone, bootstrap, HomePage, ProfilePage, UserCollection,
            SignupPage, LoginCollection, UserModel,
            AddModulePage, ModuleCollection, UserModulesCollection, getCookie, InstitutionsCollection,
            CourseCollection, LoggedOutPage, GradesCollection, AddGradePage, AssignmentsCollection) {

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
            'profile/:id': 'profile',
            'signup': 'signup',
            'profile/:id/addModule': 'addModule',
            'exit': 'exit',
            'profile/:id/addGrade/:od': 'addGrade'
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
        var gradesCollection = new GradesCollection();
        var assignmentsCollection = new AssignmentsCollection();

		var homePage = new HomePage({
            router: router,
            collection: loginCollection
        });

        var profilePage = new ProfilePage({
            router: router,
            userModulesCollection: userModulesCollection,
            gradesCollection: gradesCollection
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

        var loggedOutPage = new LoggedOutPage();

        var addGradePage = new AddGradePage({
            gradesCollection: gradesCollection,
            router: router,
            assignmentsCollection: assignmentsCollection
        });

		var pages = {
			home: homePage,
            profile: profilePage,
            signup: signupPage,
            addModule: addModulePage,
            exit: loggedOutPage,
            addGrade: addGradePage
		};

		router.on('route', function(pageName, stuff) {

            if((pageName!="exit") && (pageName=="profile" || pageName=="addModule" || pageName=="addGrade") && (stuff[0] != $("user_id").getCookie())) { // if the page requires login and the cookie user id is not correct then redirect back to the homepage

                router.navigate('#', {trigger: true});
            } else if ((pageName!="exit") && (pageName=="home" || pageName=="signup") && ($("user_id").getCookie() != "")){ // if the user if logged in redirect to the profile

                router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
            } else {

                if(pageName=="exit") {
                    document.cookie = "user_id=";
                }

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
