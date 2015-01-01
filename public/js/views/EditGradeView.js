//Filename: EditGradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/EditGradeTemplate.html'
], function($, _, Backbone, EditGradeTemplate) {

    var EditGradeView = Backbone.View.extend({
        initialize: function(options) {

            this.router = options.router;
            this.gradesCollection = options.gradesCollection;
            this.gradeModel = this.gradesCollection.get(options.grade_id);

            this.listenTo(this.gradesCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(EditGradeTemplate, {
                model: this.gradeModel
            });
            this.$el.html(template);

        },
        events: {
            'submit .edit-grade-form': 'editGrade',
            'click .cancel': 'cancel',
            'click .delete': 'delete'
        },
        editGrade: function(ev) {

            ev.preventDefault();

            $(".warning-div").empty().append("&nbsp");

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(isNaN(formContents.score)) { // make sure it's a number

                var label = $("<label>")
                    .text('Score must be a number.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);

            } else if((formContents.score.split(".")[1])) { // makes sure it's not a decimal

                var label = $("<label>")
                    .text('Score must be a natural number.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);

            } else if(formContents.score < 0) {

                var label = $("<label>")
                    .text('Score cannot be negative.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);

            } else if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").empty().append("&nbsp");
                        this.router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('Save failed.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this)
                }

                this.gradeModel.save(formContents, options);

            } else {

                var label = $("<label>")
                    .text('All fields must be filled out.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);
            }
        },
        cancel: function(ev) {

            $(".warning-div").empty().append("&nbsp");
            this.router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
        },
        delete: function(ev) {

            var gradeId = ev.currentTarget.attributes[2].value;

            this.gradeModel.destroy({ // removes the model from the collection

                data: { // sending along the id of the user
                    grade_id: gradeId
                },
                processData: true,
                success: _.bind(function() { // on removal success

                    $(".warning-div").empty().append("&nbsp");
                    this.router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
                }, this)
            });
        }
    });

    return EditGradeView;
});
