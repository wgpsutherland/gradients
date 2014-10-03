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
        },
        render: function() {
            var template = _.template(SignupTemplate);
            this.$el.html(template);
        },
        events: {
            'submit .signup-form': 'signup'
        },
        signup: function(ev) {

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

                console.log("the form is amazing");

                var options = {
                    success: _.bind(function(something) {
                        this.router.navigate('#/profile/'+something.attributes.id, {trigger: true});
                    }, this),
                    error: _.bind(function() {
                        // tell them it's wrong
                    }, this)
                }

                this.collection.create(formContents, options);

            } else {
                // red warning thing
                console.log("the form is not good");
            }
        }
    });

    return LoginView;
});
