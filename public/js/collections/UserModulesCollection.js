define([
    'underscore',
    'backbone',
    'models/ModuleModel',
    'libs/getCookie'
], function(_, Backbone, ModuleModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/modules/' + $("user_id").getCookie();
        },
        model: ModuleModel
    });
});