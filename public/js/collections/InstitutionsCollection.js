define([
    'underscore',
    'backbone',
    'models/InstitutionModel'
], function(_, Backbone, InstitutionModel) {

    return Backbone.Collection.extend({
        url: '/gradient/v1/institutions',
        model: InstitutionModel
    });
});
