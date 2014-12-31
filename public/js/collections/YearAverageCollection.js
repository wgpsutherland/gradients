define([
    'underscore',
    'backbone',
    'models/YearAverageModel'
], function(_, Backbone, YearAverageModel) {

    return Backbone.Collection.extend({
        url: function() {
            return '/gradient/v1/yearAverages'
        },
        model: YearAverageModel
    });
});
