// HomePage.js
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/HomeTemplate.html'
], function($, _, Backbone, HomeTemplate) {

	 var HomePage = Backbone.View.extend({

	 	render: function() {

	 		var template = _.template(HomeTemplate);
	 		this.$el.html(template);
	 	}
	 });

	 return HomePage;
});