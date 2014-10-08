define([
    'underscore',
    'backbone',
    'models/ModuleModel'
], function(_, Backbone, ModuleModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/modules',
        model: ModuleModel
    });
});
