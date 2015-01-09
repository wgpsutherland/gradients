//Filename: ProfileNavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ProfileNavTemplate.html',
    'libs/Utils'
], function($, _, Backbone, ProfileNavTemplate, Utils) {

    var ProfileNavView = Backbone.View.extend({

        initialize: function(options) {

            this.userId = Utils.getCookie("user_id");
            this.admin = JSON.parse(Utils.getCookie("admin"));
        },
        render: function() {

            var template = _.template(ProfileNavTemplate, {
                userId: this.userId,
                admin: this.admin
            });

            this.$el.html(template);
        },
        events: {
            'click .logout': 'logout'
        },
        logout: function(ev) {
            document.cookie = "user_id=";
            document.cookie = "auth_token=";
            document.cookie = "username=";
            document.cookie = "admin=";
        }
    });

    return ProfileNavView;
});
