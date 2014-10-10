define([
    'underscore',
    'backbone',
    'models/CourseModel'
], function(_, Backbone, CourseModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/courses',
        model: CourseModel
    });
});
