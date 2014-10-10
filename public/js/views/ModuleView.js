//Filename: ModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ModuleTemplate.html'
], function($, _, Backbone, ModuleTemplate) {

    var ModuleView = Backbone.View.extend({
        initialize: function(options) {

            this.router = options.router;
            this.userId = options.userId;

            this.listenTo(this.collection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(ModuleTemplate, {
                modules: this.collection,
                user_id: this.userId
            });
            this.$el.html(template);
        }
    });

    return ModuleView;
});
