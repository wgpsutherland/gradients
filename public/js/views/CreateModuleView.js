//Filename: CreateModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateModuleTemplate.html'
], function($, _, Backbone, CreateModuleTemplate) {

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

                        var label = $("<label>")
                            .text('Successfully created the module.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this),
                    error: _.bind(function() {

                        var label = $("<label>")
                            .text('Module already exists.')
                            .css("color", "#428bca")
                            .addClass("invalid-input-label");

                        $(".warning-div").prepend(label);

                    }, this)
                }

                this.collection.create(formContents, options);

            } else {

                var label = $("<label>")
                    .text('All fields must be filled out.')
                    .css("color", "#428bca")
                    .addClass("invalid-input-label");

                $(".warning-div").prepend(label);
            }
        }
    });

    return CreateModuleView;
});
