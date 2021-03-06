//Filename: CreateModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/CreateModuleTemplate.html',
    'libs/Labels',
    'libs/Utils'
], function($, _, Backbone, CreateModuleTemplate, Labels, Utils) {

    var CreateModuleView = Backbone.View.extend({

        initialize: function() {
            this.listenTo(this.collection, 'add remove change', this.render);
        },
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

            var formContents = Utils.formToObject($(ev.currentTarget));

            var goodForm = Utils.goodForm(formContents);

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
