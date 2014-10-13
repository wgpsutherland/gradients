define([
    'underscore',
    'backbone',
    'models/AssignmentModel'
], function(_, Backbone, AssignmentModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/assignments'
        },
        model: AssignmentModel
    });
});
