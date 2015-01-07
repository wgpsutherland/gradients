//Filename: FooterView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/FooterTemplate.html'
], function($, _, Backbone, FooterTemplate) {

    var FooterView = Backbone.View.extend({

        render: function() {
            var template = _.template(FooterTemplate);
            this.$el.html(template);
        }
    });

    return FooterView;
});
