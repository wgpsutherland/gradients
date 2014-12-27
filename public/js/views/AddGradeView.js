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
            this.router = options.router;
            this.assignmentsCollection = options.assignmentsCollection;
            this.gradesCollection = options.gradesCollection;
            this.module_id = options.module_id;
            this.user_id = options.user_id;
            this.listenTo(this.assignmentsCollection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(AddGradeTemplate, {
                assignments: this.assignmentsCollection,
                module_id: this.module_id,
                user_id: this.user_id
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

            var formContents = $(ev.currentTarget).formToObject();

            console.log(formContents);

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        var label = $("<label>")
                            .text('Successfully added grade.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('User already has this assignment.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this)
                }

                this.gradesCollection.create(formContents, options);

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
        }
    });

    return AddGradeView;
});
