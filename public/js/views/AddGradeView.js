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

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) { // if the form is syntactically valid

                console.log("the form is good");

                var options = {
                    success: _.bind(function(something) {

                    }, this),
                    error: _.bind(function() {
                        // tell them it's wrong
                    }, this)
                }

                this.gradesCollection.create(formContents, options);

            } else {
                // red warning thing
                console.log("no module has been chosen");
            }
        },
        cancel: function(ev) {
            this.router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
        }
    });

    return AddGradeView;
});
