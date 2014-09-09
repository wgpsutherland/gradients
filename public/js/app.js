// app.js
define([
    'underscore',
    'jquery',
    'backbone',
    'router'
], function(_, $, Backbone, Router) {

    var initialize = function() {

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});