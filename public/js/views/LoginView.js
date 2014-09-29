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

            var formContents = $(ev.currentTarget).formToObject();

            console.log(formContents);

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) { // if the form is syntactically valid

                console.log("the form is amazing");

                this.collection.create(formContents, {
                    wait:true
                });
            } else {
                // red warning thing
                console.log("the form is not good");
            }
        }
    });

    return LoginView;
});
