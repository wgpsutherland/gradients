// LoggedOutPage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/ExitView'
], function($, _, Backbone, NavView, ExitView) {

    var HomePage = Backbone.View.extend({

        initialize: function(options) {

            this.navView = new NavView();
            this.exitView = new ExitView();
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.exitView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.exitView.$el);
        }
    });

    return HomePage;
});