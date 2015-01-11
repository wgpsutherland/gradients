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
            this.username = options.username;

            this.listenTo(this.userModulesCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(ModuleTemplate, {
                modules: this.userModulesCollection,
                username: this.username
            });

            this.$el.html(template);
        },
        events: {
            'click .show-grade': 'showGrades',
            'click .delete-user-module': 'deleteUserModule'
        },
        showGrades: function(ev) {

            var info = ev.currentTarget.attributes["data-value"].value.split('x');

            var gradeInfo = info[0] + "x" + info[1];
            var moduleId = info[0];
            var year = info[2];
            var credits = info[3];

            this.render();

            $("#" + moduleId).css("background-color","#5995E8");

            this.gradeAverageModel = new GradeAverageModel({
                id: gradeInfo
            });

            this.gradeAverageModel.fetch();

            this.gradesCollection.fetch({
                data: gradeInfo // the module code and the user id
            });

            this.gradesView = new GradesView({
                gradesCollection: this.gradesCollection,
                gradeAverageModel: this.gradeAverageModel,
                username: this.username,
                module_id: moduleId,
                year: year,
                credits: credits
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
