//Filename: AddGradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AddGradeTemplate.html',
    'libs/getCookie'
], function($, _, Backbone, AddGradeTemplate, getCookie) {

    var AddGradeView = Backbone.View.extend({
        initialize: function(options) {
            this.assignmentsCollection = options.assignmentsCollection;
            this.module_id = options.module_id;
            this.user_id = options.user_id;
        },
        render: function() {
            var template = _.template(AddGradeTemplate, {
                assignments: this.assignmentsCollection,
                module_id: this.module_id,
                user_id: this.user_id
            });
            this.$el.html(template);
        }
    });

    return AddGradeView;
});
