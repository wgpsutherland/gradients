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
            this.courseCollection = options.courseCollection;

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

            $(".warning-div").empty().append("&nbsp");

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(formContents.password != formContents.repeatPassword) { // make sure the passwords are the same

                var label = $("<label>")
                    .text('Both passwords must match.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);

            } else if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").empty().append("&nbsp");
                        this.router.navigate('#', {trigger: true});

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('Username already exists.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

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
