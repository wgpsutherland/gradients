// SignupPage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/SignupView'
], function($, _, Backbone, NavView, SignupView) {

    var SignupPage = Backbone.View.extend({

        initialize: function(options) {

            this.userCollection = options.userCollection;
            this.institutionsCollection = options.institutionsCollection;
            this.courseCollection = options.courseCollection;

            this.institutionsCollection.fetch();
            this.courseCollection.fetch();

            this.router = options.router;

            this.navView = new NavView();

            this.signUpView = new SignupView({
                router: this.router,
                userCollection: this.userCollection,
                institutionsCollection: this.institutionsCollection,
                courseCollection: this.courseCollection
            });
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.signUpView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.signUpView.$el);
        }
    });

    return SignupPage;
});