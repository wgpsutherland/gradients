define([
    'underscore',
    'backbone',
    'models/UserModuleModel',
    'libs/Utils'
], function(_, Backbone, UserModuleModel, Utils) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {

        },
        url: function() {
            return '/gradient/v1/userModules/' + Utils.getCookie("user_id");
        },
        model: UserModuleModel
    });
});