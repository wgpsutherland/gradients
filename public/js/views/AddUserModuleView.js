//Filename: AddUserModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AddUserModuleTemplate.html'
], function($, _, Backbone, AddUserModuleTemplate) {

    var AddUserModuleView = Backbone.View.extend({
        initialize: function(options) {
            console.log(document.cookie);
            this.user_id = options.user_id;
            this.moduleCollection = options.moduleCollection;
            this.userModulesCollection = options.userModulesCollection;
            this.listenTo(this.userModulesCollection, 'add remove change', this.render);
            this.listenTo(this.moduleCollection, 'add remove change', this.render);
        },
        render: function() {
            var template = _.template(AddUserModuleTemplate, {
                modules: this.moduleCollection,
                user_id: this.user_id
            });
            this.$el.html(template);
        },
        events: {
            'submit .add-user-module-form': 'addUserModule'
        },
        addUserModule: function(ev) {
            ev.preventDefault();

            var formContents = $(ev.currentTarget).formToObject();

            var goodForm = _.every(formContents, function(field) { // checks that each field in the form has been filled
                if(field.trim().length>0) {
                    return true;
                } else {
                    return false;
                }
            });

            if(goodForm) { // if the form is syntactically valid

                console.log("the form is good");

                var options = {
                    success: _.bind(function(something) {

                    }, this),
                    error: _.bind(function() {
                        // tell them it's wrong
                    }, this)
                }

                this.userModulesCollection.create(formContents, options);

            } else {
                // red warning thing
                console.log("no module has been chosen");
            }
        }
    });

    return AddUserModuleView;
});
