//Filename: SignupView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/SignupTemplate.html',
    'libs/formToObject',
    'libs/Labels',
    'libs/Utils'
], function($, _, Backbone, SignupTemplate, formToObject, Labels, Utils) {

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

            var goodForm = Utils.goodForm(formContents);

            if(formContents.username.length > 15) {

                $(".warning-div").prepend(Labels.usernameTooShort);

            } else if(formContents.password != formContents.repeatPassword) { // make sure the passwords are the same

                $(".warning-div").prepend(Labels.passwordsNotMatching);

            } else if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").empty().append("&nbsp");
                        this.router.navigate('#', {trigger: true});

                    }, this),
                    error: _.bind(function() {

                        $(".warning-div").append(Labels.usernameExists);

                    }, this)
                }

                this.userCollection.create(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        }
    });

    return LoginView;
});
