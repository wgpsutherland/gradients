//Filename: GradesView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/GradesTemplate.html'
], function($, _, Backbone, GradesTemplate) {

    var GradesView = Backbone.View.extend({
        initialize: function() {
            this.listenTo(this.collection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(GradesTemplate, {grades: this.collection});
            this.$el.html(template);
        }
    });

    return GradesView;
});
