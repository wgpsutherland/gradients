define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    return Backbone.Model.extend({
        urlRoot: '/gradient/v1/module'
    });
});
