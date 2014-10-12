define([
    'underscore',
    'backbone',
    'models/GradeModel',
], function(_, Backbone, GradeModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/grades'
        },
        model: GradeModel
    });
});
