//Filename: CreateAssignmentView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateAssignmentTemplate.html'
], function($, _, Backbone, CreateAssignmentTemplate) {

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

                        var label = $("<label>")
                            .text('Successfully created the assignment.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('Assignment already exists.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this)
                }

                this.assignmentsCollection.create(formContents, options);

            } else {

                var label = $("<label>")
                    .text('All fields must be filled out.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);
            }
        }
    });

    return CreateAssignmentView;
});
