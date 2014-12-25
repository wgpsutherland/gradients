//Filename: SignupView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SignupTemplate.html',
    'libs/formToObject'
], function($, _, Backbone, SignupTemplate, formToObject) {

    var LoginView = Backbone.View.extend({
        initialize: function(options) {
            this.router = options.router;
            this.userCollection = options.userCollection;
            this.institutionsCollection = options.institutionsCollection;
            this.courseCollection = options.courseCollection

            this.listenTo(this.institutionsCollection, 'add remove change', this.render);
            this.listenTo(this.courseCollection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(SignupTemplate, {
                institutions: this.institutionsCollection,
                courses: this.courseCollection
            });
            this.$el.html(template);
        },
        events: {
            'submit .signup-form': 'signup'
        },
        signup: function(ev) {

            ev.preventDefault();

            $(".warning-div").empty();

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) { // if the form is syntactically valid

                var label = $("<label>")
                    .text('Username already exists.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                var options = {
                    success: _.bind(function(something) {

                        $(".signup-username-div").removeClass("has-error");
                        $(".warning-div").empty();
                        this.router.navigate('#', {trigger: true});

                    }, this),
                    error: _.bind(function() {

                        $(".signup-username-div").addClass("has-error");
                        $(".warning-div").append(label);
                    }, this)
                }

                this.userCollection.create(formContents, options);

            } else {

                var label = $("<label>")
                    .text('All fields must be filled out.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);
            }
        }
    });

    return LoginView;
});
