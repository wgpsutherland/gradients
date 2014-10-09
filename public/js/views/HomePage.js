// HomePage.js
define([
	'jquery',
	'underscore',
	'backbone',
    'views/NavView',
    'views/LoginView'
], function($, _, Backbone, NavView, LoginView) {

	 var HomePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.navView = new NavView();

            this.loginView = new LoginView({
                router: this.router,
                collection: this.collection
            });
        },
	 	render: function() {

            this.$el.empty();

            this.navView.render();
            this.loginView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.loginView.$el);
        }
	 });

	 return HomePage;
});