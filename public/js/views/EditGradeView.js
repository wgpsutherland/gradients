//Filename: EditGradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/EditGradeTemplate.html',
    'libs/Labels',
    'libs/Utils'
], function($, _, Backbone, EditGradeTemplate, Labels, Utils) {

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

            var formContents = Utils.formToObject($(ev.currentTarget));

            var goodForm = Utils.goodForm(formContents);

            if(isNaN(formContents.score)) { // make sure it's a number

                $(".warning-div").prepend(Labels.scoreNotNumber);

            } else if((formContents.score.split(".")[1])) { // makes sure it's not a decimal

                $(".warning-div").prepend(Labels.scoreNotNatural);

            } else if(formContents.score < 0) {

                $(".warning-div").prepend(Labels.scoreNotPositive);

            } else if(goodForm) { // if the form is syntactically valid

                var options = {
                    data: {
                        user_id: Utils.getCookie("user_id")
                    },
                    processData: true,
                    success: _.bind(function(something) {

                        $(".warning-div").empty().append("&nbsp");

                        var username = Utils.getCookie("username");
                        var url = '#/' + username;

                        this.router.navigate(url, {trigger: true});

                    }, this),
                    error: _.bind(function(er) {

                        $(".warning-div").prepend(Labels.saveFailed);

                    }, this)
                }

                this.gradeModel.save(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        },
        cancel: function(ev) {

            $(".warning-div").empty().append("&nbsp");

            var username = Utils.getCookie("username");
            var url = '#/' + username;

            this.router.navigate(url, {trigger: true});
        },
        delete: function(ev) {

            var gradeId = ev.currentTarget.attributes[2].value;

            this.gradeModel.destroy({ // removes the model from the collection

                data: { // sending along the id of the user
                    grade_id: gradeId,
                    user_id: Utils.getCookie("user_id")
                },
                processData: true,
                success: _.bind(function() { // on removal success

                    $(".warning-div").empty().append("&nbsp");

                    var username = Utils.getCookie("username");
                    var url = '#/' + username;

                    this.router.navigate(url, {trigger: true});

                }, this)
            });
        }
    });

    return EditGradeView;
});
