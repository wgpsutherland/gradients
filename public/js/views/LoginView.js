//Filename: LoginView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/LoginTemplate.html',
    'libs/formToObject'
], function($, _, Backbone, LoginTemplate, formToObject) {

    var LoginView = Backbone.View.extend({
        initialize: function(options) {
            this.router = options.router;
        },
        render: function() {
            var template = _.template(LoginTemplate);
            this.$el.html(template);
        },
        events: {
            'submit .login-form': 'login'
        },
        login: function(ev) {

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

                var options = {
                    success: _.bind(function(something) {

                        // empties the form so on logout the values aren't still there
                        $(ev.currentTarget).trigger("reset");

                        document.cookie = "user_id=" + something.attributes.id + ";";

                        $(".login-username-div").removeClass("has-error");
                        $(".login-password-div").removeClass("has-error");
                        $(".warning-div").empty();

                        this.router.navigate('#/profile/'+something.attributes.id, {trigger: true});

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('Invalid username/ password.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").append(label);

                        this.router.navigate('#', {trigger: true});
                    }, this)
                }

                this.collection.create(formContents, options);

            } else {

                $(".login-username-div").addClass("has-error");
                $(".login-password-div").addClass("has-error");
            }
        }
    });

    return LoginView;
});
