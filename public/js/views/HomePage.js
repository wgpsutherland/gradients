// HomePage.js
define([
	'jquery',
	'underscore',
	'backbone',
    'views/NavView',
    'views/LoginView',
    'views/FooterView'
], function($, _, Backbone, NavView, LoginView, FooterView) {

	 var HomePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.navView = new NavView();

            this.loginView = new LoginView({
                router: this.router,
                collection: this.collection
            });

            this.footerView = new FooterView();
        },
	 	render: function() {

            this.$el.empty();

            this.navView.render();
            this.loginView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.loginView.$el);
            this.$el.append(this.footerView.$el);
        }
	 });

	 return HomePage;
});