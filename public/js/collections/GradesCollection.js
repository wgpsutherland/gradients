define([
    'underscore',
    'backbone',
    'models/GradeModel'
], function(_, Backbone, GradeModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/grades',
        model: GradeModel
    });
});
