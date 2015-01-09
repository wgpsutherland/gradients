//Filename: ProfileNavView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ProfileNavTemplate.html',
    'models/UserModel'
], function($, _, Backbone, ProfileNavTemplate, UserModel) {

    var ProfileNavView = Backbone.View.extend({

        initialize: function(options) {

            this.userModel = new UserModel({id: options.id});
            this.userModel.fetch();

            this.listenTo(this.userModel, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(ProfileNavTemplate, {
                user: this.userModel
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
        }
    });

    return ProfileNavView;
});
