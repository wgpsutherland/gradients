define([
    'underscore',
    'backbone',
    'models/GradeModel'
], function(_, Backbone, GradeModel) {

    return Backbone.Collection.extend({
        initialize: function(models, options) {
            console.log("options");
            console.log(options);
            this.id = options.id
        },
        url: function() {
            return '/gradient/v1/grades/' + this.id;
        },
        model: GradeModel
    });
});
