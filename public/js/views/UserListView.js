//Filename: UserListView
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/UsersCollection',
	'text!templates/userListTemplate.html'
], function($, _, Backbone, Users, userListTemplate) {

	var UserListView = Backbone.View.extend({
		el: '.page',
		render: function() {
			var that = this;
			var users = new Users();
			users.fetch({
				success: function(users) {

					var template = _.template(userListTemplate, {users: users.models});
					that.$el.html(template);
				}
			})
		}
	});

	return UserListView;
});