//Filename: ProfileNavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ProfileNavTemplate.html'
], function($, _, Backbone, ProfileNavTemplate) {

    var NavView = Backbone.View.extend({
        initialize: function(options) {
            this.router = options.router;
        },
        render: function() {
            var template = _.template(ProfileNavTemplate);
            this.$el.html(template);
        },
        events: {
            'click .logout': 'logout'
        },
        logout: function(ev) {
            document.cookie = "user_id=";
            this.router.navigate('#', {trigger: true});
        }
    });

    return NavView;
});
