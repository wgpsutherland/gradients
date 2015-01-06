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

            $(".warning-div").empty().append("&nbsp");

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

                        // sets the cookie which is integral to the login system working
                        document.cookie = "user_id=" + something.attributes.id + ";";

                        $(".warning-div").empty().append("&nbsp");

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

                var label = $("<label>")
                    .text('All fields must be filled out.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").append(label);
            }
        }
    });

    return LoginView;
});
