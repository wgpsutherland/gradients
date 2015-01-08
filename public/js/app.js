// app.js
define([
    'underscore',
    'jquery',
    'backbone',
    'router',
    'libs/Utils'
], function(_, $, Backbone, Router, Utils) {

    var initialize = function() {

        var backboneOriginal = Backbone.sync;

        Backbone.sync = function(method, model, options) {

            // add the authentication token to the header every time an ajax request is made
            $.ajaxSetup({
                headers: {
                    "user_id": Utils.getCookie("user_id"),
                    "auth_token": Utils.getCookie("auth_token"),
                    "username": Utils.getCookie("username")
                }
            });

            // then simply return the original sync method so it all works as it should
            return backboneOriginal(method, model, options);
        }

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});