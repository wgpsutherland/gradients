//Filename: EditUserView.js
define([
	'jquery',
	'underscore',
	'backbone',
	'models/UserModel',
	'libs/formToObject',
	'text!templates/editUserTemplate.html'
], function($, _, Backbone, User, formToObject, editUserTemplate) {

	var EditUserView = Backbone.View.extend({
		el: '.page',
		initialize: function(options) {
			this.router = options;
		},
		render: function(options) {
			var that = this;
			if(options.id) {
				this.user = new User({id: options.id});
				this.user.fetch({
					success: function(user) {
						var template = _.template(editUserTemplate, {user: user});
						that.$el.html(template);
					}
				});
			} else {
				var template = _.template(editUserTemplate, {user: null});
				this.$el.html(template);
			}
		},
		events: {
			'submit .edit-user-form': 'saveUser',
			'click .delete': 'deleteUser'
		}, 
		saveUser: function(ev) {
			var userDetails = $(ev.currentTarget).formToObject();
			var user = new User();
			user.save(userDetails, {
				success: _.bind(function() {
					this.router.navigate('', {trigger: true});
				}, this)
			});
			return false;
		},
		deleteUser: function(ev) {
			this.user.destroy({
				success: _.bind(function() {
					this.router.navigate('', {trigger: true});
				}, this)
			});
			return false;
		}
	})

	return EditUserView;
});
