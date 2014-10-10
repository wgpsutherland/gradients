//Filename: UserInfoView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/UserInfoTemplate.html'
], function($, _, Backbone, UserInfoTemplate) {

    var UserInfoView = Backbone.View.extend({
        initialize: function(options) {

            this.userModel = options.userModel;

            this.listenTo(this.userModel, 'add remove change', this.render);
        },
        render: function() {

            var that=this;

            var draw = function(user) {
                var template = _.template(UserInfoTemplate, {user: user});
                this.$el.html(template);
            }

            this.user = this.userModel;

            this.user.fetch({
                success: function(user) {
                    draw.call(that, user);
                }
            });
        }
    });

    return UserInfoView;
});
