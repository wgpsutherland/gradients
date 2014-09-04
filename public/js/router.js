// Filename: router.js
define([
	'jquery',
	'underscore',
	'backbone',
	'views/EditUserView',
	'views/UserListView'
], function($, _, Backbone, EditUserView, UserListView) {

	var Router = Backbone.Router.extend({
		routes: {
			'': 'home',
			'new': 'editUser',
			'edit/:id': 'editUser'
		}
	});

	var initialise = function() {

		var router = new Router();
		var userListView =  new UserListView();
		var editUserView =  new EditUserView(router);

		router.on('route:home', function() {
			userListView.render();
		});

		router.on('route:editUser', function(id) {
			editUserView.render({id: id});
		});

		Backbone.history.start();
	};

	return {
		initialise: initialise
	};
});
