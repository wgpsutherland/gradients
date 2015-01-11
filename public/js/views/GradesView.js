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
            this.username = options.username;
            this.module_id = options.module_id;
            this.year = options.year;
            this.credits = options.credits;

            this.listenTo(this.gradesCollection, 'add remove change', this.render);
            this.listenTo(this.gradeAverageModel, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(GradesTemplate, {
                grades: this.gradesCollection,
                moduleAverage: this.gradeAverageModel,
                username: this.username,
                module_id: this.module_id,
                year: this.year,
                credits: this.credits
            });

            this.$el.html(template);
        }
    });

    return GradesView;
});
