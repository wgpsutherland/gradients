// AddModulePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/AddUserModuleView',
    'collections/UserModulesCollection'
], function($, _, Backbone, NavView, AddUserModuleView, UserModulesCollection) {

    var AddModulePage = Backbone.View.extend({

        initialize: function(options) {

            this.navView = new NavView();
            this.router = options.router;

            this.router.on('route:addModule', function(id) {

                this.moduleCollection = options.moduleCollection;

                this.moduleCollection.fetch();

                this.userModulesCollection = new UserModulesCollection([],{id:id});

                this.addUserModuleView = new AddUserModuleView({
                    user_id: id,
                    moduleCollection: this.moduleCollection,
                    userModulesCollection: this.userModulesCollection
                });

                // maybe stick in a userModulesCollection fetch here

            },this);
        },
        render: function() {

            this.$el.empty();

            // nav bar with sign up, login etc
            this.navView.render();
            this.$el.append(this.navView.$el);

            this.addUserModuleView.render();
            this.$el.append(this.addUserModuleView.$el);

        }
    });

    return AddModulePage;
});