//Filename: ModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ModuleTemplate.html',
    'models/GradeAverageModel',
    'views/GradesView'
], function($, _, Backbone, ModuleTemplate, GradeAverageModel, GradesView) {

    var ModuleView = Backbone.View.extend({
        initialize: function(options) {

            this.userModulesCollection = options.userModulesCollection;
            this.gradesCollection = options.gradesCollection;
            this.router = options.router;
            this.userId = options.userId;

            this.listenTo(this.userModulesCollection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(ModuleTemplate, {
                modules: this.userModulesCollection,
                user_id: this.userId
            });
            this.$el.html(template);
        },
        events: {
            'click .show-grades': 'showGrades',
            'click .delete-user-module': 'deleteUserModule'
        },
        showGrades: function(ev) {

            this.render();

            this.gradeAverageModel = new GradeAverageModel({
                id: ev.currentTarget.attributes[2].value
            });

            this.gradeAverageModel.fetch();

            this.gradesCollection.fetch({
                data: ev.currentTarget.attributes[2].value // the module code and the user id
            });

            this.gradesView = new GradesView({
                gradesCollection: this.gradesCollection,
                gradeAverageModel: this.gradeAverageModel,
                user_id: this.userId
            });

            this.gradesView.render();

            this.$el.append(this.gradesView.$el);
        },
        deleteUserModule: function(ev) {

            var id = ev.currentTarget.attributes[2].value; // extracts the model id from the delete button

            this.model = this.userModulesCollection.get(id); // fetches the model from the collection

            this.model.destroy({ // removes the model from the collection

                data: { // sending along the id of the user
                    user_id: this.userId
                },
                processData: true,
                success: _.bind(function() { // on removal success
                    // do something to indicate that it worked
                }, this)
            });
        }
    });

    return ModuleView;
});
