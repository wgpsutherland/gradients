define([
    'underscore',
    'backbone',
    'models/LoginModel'
], function(_, Backbone, LoginModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/login',
        model: LoginModel
    });
});
