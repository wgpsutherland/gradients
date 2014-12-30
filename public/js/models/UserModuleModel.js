define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    return Backbone.Model.extend({
        initialize: function(stuff) {
        },
        urlRoot: '/gradient/v1/userModules/'
    });
});
