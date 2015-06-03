//Filename: AddGradeView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AddGradeTemplate.html',
    'libs/Labels',
    'libs/Utils'
], function($, _, Backbone, AddGradeTemplate, Labels, Utils) {

    var AddGradeView = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;
            this.assignmentsCollection = options.assignmentsCollection;
            this.gradesCollection = options.gradesCollection;

            this.module_id = options.module_id;
            this.user_id = options.user_id;
            this.year = options.year;

            this.listenTo(this.assignmentsCollection, 'add remove change', this.render);
            this.listenTo(this.gradesCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(AddGradeTemplate, {
                assignments: this.assignmentsCollection,
                module_id: this.module_id,
                user_id: this.user_id,
                year: this.year
            });

            this.$el.html(template);
        },
        events: {
            'submit .add-grade-form': 'addGrade',
            'click .cancel': 'cancel'
        },
        addGrade: function(ev) {

            ev.preventDefault();

            $(".warning-div").empty().append("&nbsp");

            var formContents = Utils.formToObject($(ev.currentTarget));

            var goodForm = Utils.goodForm(formContents);

            if(isNaN(formContents.score)) { // make sure it's a number

                $(".warning-div").prepend(Labels.scoreNotNumber);

            } else if(formContents.score < 0) {

                $(".warning-div").prepend(Labels.scoreNotPositive);

            } else if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").prepend(Labels.gradeSuccess);

                    }, this),
                    error: _.bind(function() {

                        $(".warning-div").prepend(Labels.gradeExists);

                    }, this)
                };

                this.gradesCollection.create(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        },
        cancel: function(ev) {

            $(".warning-div").empty().append("&nbsp");

            var username = Utils.getCookie("username");
            var url = '#/' + username;

            this.router.navigate(url, {trigger: true});
        }
    });

    return AddGradeView;
});
