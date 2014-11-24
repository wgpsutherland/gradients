//Filename: GradesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/GradesTemplate.html'
], function($, _, Backbone, GradesTemplate) {

    var GradesView = Backbone.View.extend({
        initialize: function(options) {

            this.gradesCollection = options.gradesCollection;
            this.gradeAverageModel = options.gradeAverageModel;
            this.listenTo(this.gradesCollection, 'add remove change', this.render);
            this.listenTo(this.gradeAverageModel, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(GradesTemplate, {
                grades: this.gradesCollection,
                moduleAverage: this.gradeAverageModel
            });
            this.$el.html(template);
        }
    });

    return GradesView;
});
