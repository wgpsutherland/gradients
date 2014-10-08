define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    return Backbone.Model.extend({
        initialize: function(stuff) {
            console.log(stuff);
        },
        urlRoot: '/gradient/v1/modules/'
    });
});
