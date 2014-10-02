// ProfilePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
], function($, _, Backbone, NavView) {

    var HomePage = Backbone.View.extend({

        initialize: function(options) {

            this.navView = new NavView();

        },
        render: function() {

            this.$el.empty();

            // nav bar with sign up, login etc
            this.navView.render();
            this.$el.append(this.navView.$el);
        }
    });

    return HomePage;
});