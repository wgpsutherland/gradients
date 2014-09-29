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

            // nav bar with sign up, login etc
            this.navView.render();
            this.$el.append(this.navView.$el);

            // login view
            this.loginView.render();
            this.$el.append(this.loginView.$el);

            // sign up view
            // explanation views
        }
	 });

	 return HomePage;
});