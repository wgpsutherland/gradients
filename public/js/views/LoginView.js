//Filename: LoginView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/LoginTemplate.html',
    'libs/Labels',
    'libs/Utils'
], function($, _, Backbone, LoginTemplate, Labels, Utils) {

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

            var formContents = Utils.formToObject($(ev.currentTarget));

            var goodForm = Utils.goodForm(formContents);

            if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(res) {

                        // empties the form so on logout the values aren't still there
                        $(ev.currentTarget).trigger("reset");

                        var authToken = res.attributes.auth.token;
                        var userId = res.attributes.auth.user.id;
                        var username = res.attributes.auth.user.username;
                        var admin = res.attributes.auth.user.admin;

                        // sets the cookies which are integral to the login system
                        document.cookie = "user_id=" + userId + ";";
                        document.cookie = "auth_token=" + authToken + ";";
                        document.cookie = "username=" + username + ";";
                        document.cookie = "admin=" + admin + ";";

                        $(".warning-div").empty().append("&nbsp");

                        this.router.navigate('#/' + username, {trigger: true});

                    }, this),
                    error: _.bind(function(er) {

                        $(".warning-div").append(Labels.invalidUsernamePassword);

                    }, this)
                }

                this.collection.create(formContents, options);

            } else {

                $(".warning-div").append(Labels.emptyFields);
            }
        }
    });

    return LoginView;
});
