//Filename: ExitView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ExitTemplate.html'
], function($, _, Backbone, ExitTemplate) {

    var ExitView = Backbone.View.extend({
        render: function() {
            var template = _.template(ExitTemplate);
            this.$el.html(template);
        }
    });

    return ExitView;
});
