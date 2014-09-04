define([
  'underscore',
  'backbone'
], function(_, Backbone) {

	return Backbone.Collection.extend({
		url: '/users'
	});
});
