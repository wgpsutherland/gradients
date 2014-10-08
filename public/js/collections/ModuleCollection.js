define([
    'underscore',
    'backbone',
    'models/ModuleModel'
], function(_, Backbone, ModuleModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {
            console.log("options");
            console.log(options.id);
            this.id = options.id;
        },
        url: function() {
            return '/gradient/v1/modules/' + this.id;
        },
        model: ModuleModel
    });
});