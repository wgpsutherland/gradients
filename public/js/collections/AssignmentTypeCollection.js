define([
    'underscore',
    'backbone',
    'models/AssignmentTypeModel'
], function(_, Backbone, AssignmentTypeModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/assignmentType'
        },
        model: AssignmentTypeModel
    });
});
