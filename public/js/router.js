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
    'collections/InstitutionsCollection',
    'collections/CourseCollection',
    'collections/GradesCollection',
    'views/AddGradePage',
    'collections/AssignmentsCollection',
    'views/AdminPage',
    'views/EditGradePage',
    'collections/AssignmentTypeCollection',
    'collections/YearAverageCollection',
    'libs/Utils'
], function($, _, Backbone,
    bootstrap, HomePage, ProfilePage,
    UserCollection, SignupPage, LoginCollection,
    UserModel, AddModulePage, ModuleCollection,
    UserModulesCollection, InstitutionsCollection, CourseCollection,
    GradesCollection, AddGradePage, AssignmentsCollection,
    AdminPage, EditGradePage, AssignmentTypeCollection,
    YearAverageCollection, Utils) {

	var Router = Backbone.Router.extend({

        initialize: function() {

            //track every route change as a page view in google analytics
            this.bind('route', this.trackPageview);
        },
		routes: {
			'': 'home',
            ':id': 'profile',
            'signup': 'signup',
            ':id/addModule': 'addModule',
            ':id/addGrade/:od/:ed': 'addGrade',
            ':id/admin': 'admin',
            ':id/editGrade/:ed/:od': 'editGrade'
		},
        trackPageview: function () {

            var url = Backbone.history.getFragment();

            //prepend slash
            if (!/^\//.test(url) && url != "") {
                url = "/" + url;
            }

            ga('send', 'pageview', {page: "/" + url});
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
        var assignmentTypeCollection = new AssignmentTypeCollection();
        var yearAverageCollection = new YearAverageCollection();

		var homePage = new HomePage({
            router: router,
            collection: loginCollection
        });

        var profilePage = new ProfilePage({
            router: router,
            userModulesCollection: userModulesCollection,
            gradesCollection: gradesCollection,
            yearAverageCollection: yearAverageCollection
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

        var addGradePage = new AddGradePage({
            gradesCollection: gradesCollection,
            router: router,
            assignmentsCollection: assignmentsCollection
        });

        var adminPage = new AdminPage({
            router: router,
            moduleCollection: moduleCollection,
            assignmentsCollection: assignmentsCollection,
            courseCollection: courseCollection,
            assignmentTypeCollection: assignmentTypeCollection
        });

        var editGradePage = new EditGradePage({
            router: router,
            gradesCollection: gradesCollection
        });

		var pages = {
			home: homePage,
            profile: profilePage,
            signup: signupPage,
            addModule: addModulePage,
            addGrade: addGradePage,
            admin: adminPage,
            editGrade: editGradePage
		};

		router.on('route', function(pageName, id) {

            var username = Utils.getCookie("username");
            var userId = Utils.getCookie("user_id");

            if(userId) { // if logged in

                if ( // if the page requires login and the cookie user id is not correct then redirect back to the homepage
                (  pageName=="profile"
                || pageName=="addModule"
                || pageName=="addGrade"
                || pageName=="admin"
                || pageName=="editGrade" )
                && (id[0] != username)
                ) {

                    router.navigate('#/' + username, {trigger: true});

                } else if ((pageName=="home" || pageName=="signup")) { // if the user is logged in redirect to the profile

                    router.navigate('#/' + username, {trigger: true});

               } else if(pageName=="admin") { // do an access check

                    this.userModel = new UserModel({
                        id: userId
                    });

                    this.userModel.fetch({

                        success: _.bind(function() { // successful connection to the db

                            if(!(this.userModel.get('admin'))) {  // if they're not an admin redirect

                                router.navigate('#/', {trigger: true});

                            } else { renderPage(pageName); }

                        }, this),
                        error: (function() { // if the model cannot be found on the server

                            router.navigate('#/', {trigger: true});
                        })
                    });

               } else { renderPage(pageName); }

            } else {

                renderPage(pageName);
            }
		});

		Backbone.history.start({
			pushState: false
		});

        function renderPage(pageName) {

            if (!$('.page > [data-name="' + pageName + '"]').length) { // checks if the page has been rendered before

                pages[pageName].render();
                $('.page').append(pages[pageName].$el.attr('data-name', pageName));
            }

            _.each(pages, function(page, name) {
                page.$el.toggle(name===pageName);
            });
        }
	}

	return {
		initialize: initialize
	}
});
