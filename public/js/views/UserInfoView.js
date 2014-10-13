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

            this.user = this.userModel;

            var template = _.template(UserInfoTemplate, {user: this.user});
            this.$el.html(template);
        }
    });

    return UserInfoView;
});
