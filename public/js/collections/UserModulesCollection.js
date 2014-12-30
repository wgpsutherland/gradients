define([
    'underscore',
    'backbone',
    'models/UserModuleModel',
    'libs/getCookie'
], function(_, Backbone, UserModuleModel, getCookie) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/userModules/' + $("user_id").getCookie();
        },
        model: UserModuleModel
    });
});