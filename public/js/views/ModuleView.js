//Filename: ModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ModuleTemplate.html'
], function($, _, Backbone, ModuleTemplate) {

    var ModuleView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.collection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(ModuleTemplate, {modules: this.collection});
            this.$el.html(template);
        }
    });

    return ModuleView;
});
