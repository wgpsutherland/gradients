//Filename: AddUserModuleView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AddUserModuleTemplate.html',
    'libs/getCookie',
    'libs/Labels'
], function($, _, Backbone, AddUserModuleTemplate, getCookie, Labels) {

    var AddUserModuleView = Backbone.View.extend({
        initialize: function(options) {

            this.user_id = options.user_id;
            this.router = options.router;
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
            'submit .add-user-module-form': 'addUserModule',
            'click .cancel': 'cancel'
        },
        addUserModule: function(ev) {

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

            if(goodForm) { // if the form is syntactically valid

                var options = {
                    success: _.bind(function(something) {

                        $(".warning-div").prepend(Labels.userModuleSuccess);

                    }, this),
                    error: _.bind(function() {

                        $(".warning-div").prepend(Labels.userModuleExists);
                    }, this)
                }

                this.userModulesCollection.create(formContents, options);

            } else {

                $(".warning-div").prepend(Labels.emptyFields);
            }
        },
        cancel: function(ev) {

            $(".warning-div").empty().append("&nbsp");
            this.router.navigate('#/profile/'+$("user_id").getCookie(), {trigger: true});
        }
    });

    return AddUserModuleView;
});
