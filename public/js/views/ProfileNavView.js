//Filename: ProfileNavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ProfileNavTemplate.html'
], function($, _, Backbone, ProfileNavTemplate) {

    var NavView = Backbone.View.extend({
        render: function() {
            var template = _.template(ProfileNavTemplate);
            this.$el.html(template);
        },
        events: {
            'click .logout': 'logout'
        },
        logout: function(ev) {
            document.cookie = "user_id=";
        }
    });

    return NavView;
});
