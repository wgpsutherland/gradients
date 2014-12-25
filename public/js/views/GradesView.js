//Filename: GradesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/GradesTemplate.html',
    'text!templates/NoGradesTemplate.html'
], function($, _, Backbone, GradesTemplate, NoGradesTemplate) {

    var GradesView = Backbone.View.extend({
        initialize: function(options) {

            this.gradesCollection = options.gradesCollection;
            this.gradeAverageModel = options.gradeAverageModel;
            this.user_id = options.user_id;

            this.listenTo(this.gradesCollection, 'add remove change', this.render);
            this.listenTo(this.gradeAverageModel, 'add remove change', this.render);
        },
        render: function() {

            var template;

            if(this.gradesCollection.length > 0) {

                template = _.template(GradesTemplate, {
                    grades: this.gradesCollection,
                    moduleAverage: this.gradeAverageModel,
                    user_id: this.user_id
                });

            } else {
                template = _.template(NoGradesTemplate);
            }

            this.$el.html(template);
        }
    });

    return GradesView;
});
