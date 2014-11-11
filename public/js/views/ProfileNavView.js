//Filename: ProfileNavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ProfileNavTemplate.html'
], function($, _, Backbone, ProfileNavTemplate) {

    var NavView = Backbone.View.extend({
        initialize: function(options) {

            if(options) {
                this.user_id = options.user_id;
            } else {
                this.user_id = 0;
            }
        },
        render: function() {
            var template = _.template(ProfileNavTemplate, {
                user_id: this.user_id
            });
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
