define([
    'underscore',
    'backbone',
    'models/UserModel'
], function(_, Backbone, UserModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/users',
        model: UserModel
    });
});
