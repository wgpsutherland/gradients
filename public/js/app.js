// app.js
define([
    'underscore',
    'jquery',
    'backbone',
    'router',
    'libs/Utils'
], function(_, $, Backbone, Router, Utils) {

    var initialize = function() {

        Router.initialize();
    };

    return {
        initialize: initialize
    };
});