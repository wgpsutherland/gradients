//Filename: NavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/NavTemplate.html'
], function($, _, Backbone, NavTemplate) {

    var NavView = Backbone.View.extend({
        initialize: function() {

        },
        render: function() {
            var template = _.template(NavTemplate);
            this.$el.html(template);
        }
    });

    return NavView;
});
