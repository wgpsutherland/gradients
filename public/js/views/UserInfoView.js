//Filename: UserInfoView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UserInfoTemplate.html'
], function($, _, Backbone, UserInfoTemplate) {

    var UserInfoView = Backbone.View.extend({
        initialize: function() {

        },
        render: function(id) {

            var that=this;

            var draw = function(user) {
                var template = _.template(UserInfoTemplate, {user: user});
                this.$el.html(template);
            }

            this.user = this.collection.get(id);

            this.user.fetch({
                success: function(user) {
                    draw.call(that, user);
                }
            });
        }
    });

    return UserInfoView;
});
