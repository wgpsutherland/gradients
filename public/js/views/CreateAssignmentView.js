//Filename: CreateAssignmentView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateAssignmentTemplate.html',
    'libs/Labels'
], function($, _, Backbone, CreateAssignmentTemplate, Labels) {

    var CreateAssignmentView = Backbone.View.extend({
        initialize: function(options) {

            this.assignmentsCollection = options.assignmentsCollection;
            this.assignmentTypeCollection = options.assignmentTypeCollection;
            this.moduleCollection = options.moduleCollection;

            this.listenTo(this.assignmentTypeCollection, 'add remove change', this.render);
            this.listenTo(this.moduleCollection, 'add remove change', this.render);
        },
        render: function() {

            var template = _.template(CreateAssignmentTemplate, {
                modules: this.moduleCollection,
                assignmentTypes: this.assignmentTypeCollection
            });

            this.$el.html(template);

            this.$("#datepicker")
                .datepicker({ dateFormat: 'dd M yy' }) // example: 06 Jan 2015
                .datepicker("setDate", new Date());
        },
        events: {
            'submit .create-assignment-form': 'createAssignment'
        },
        createAssignment: function(ev) {

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

            if(goodForm) {

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").prepend(Labels.assignmentSuccess);

                    }, this),
                    error: _.bind(function() {

                        $(".warning-div").prepend(Labels.assignmentExists);

                    }, this)
                }

                this.assignmentsCollection.create(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        }
    });

    return CreateAssignmentView;
});
