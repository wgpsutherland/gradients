//Filename: EditGradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/EditGradeTemplate.html'
], function($, _, Backbone, EditGradeTemplate) {

    var EditGradeView = Backbone.View.extend({
        initialize: function(options) {

            this.gradesCollection = options.gradesCollection;
            this.gradeModel = options.gradeModel;

            this.listenTo(this.gradesCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(EditGradeTemplate, {
                model: this.gradeModel
            });
            this.$el.html(template);

        },
        events: {

        }
    });

    return EditGradeView;
});
