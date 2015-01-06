//Filename: CreateModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateModuleTemplate.html',
    'libs/Labels'
], function($, _, Backbone, CreateModuleTemplate, Labels) {

    var CreateModuleView = Backbone.View.extend({
        render: function() {
            var template = _.template(CreateModuleTemplate);
            this.$el.html(template);
        },
        events: {
            'submit .create-module-form': 'createModule'
        },
        createModule: function(ev) {

            ev.preventDefault();

            $(".warning-div").empty().append("&nbsp");

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) {

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").prepend(Labels.moduleSuccess);

                    }, this),
                    error: _.bind(function() {

                        $(".warning-div").prepend(Labels.moduleExists);

                    }, this)
                }

                this.collection.create(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        }
    });

    return CreateModuleView;
});
