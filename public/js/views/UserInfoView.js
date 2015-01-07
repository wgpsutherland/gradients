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
            this.yearAverageCollection = options.yearAverageCollection;

            this.listenTo(this.userModel, 'add remove change', this.render);
            this.listenTo(this.yearAverageCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(UserInfoTemplate, {
                user: this.userModel,
                averages: this.yearAverageCollection
            });

            this.$el.html(template);
        }
    });

    return UserInfoView;
});
