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
            this.gradesCollection = options.gradesCollection;
            this.module_id = options.module_id;
        },
        render: function() {
            var template = _.template(AddGradeTemplate, {
                grades: this.gradesCollection,
                module_id: this.module_id
            });
            this.$el.html(template);
        }
    });

    return AddGradeView;
});
