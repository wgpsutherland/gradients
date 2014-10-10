// AddModulePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/AddUserModuleView',
    'collections/UserModulesCollection'
], function($, _, Backbone, ProfileNavView, AddUserModuleView, UserModulesCollection) {

    var AddModulePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;
            this.navView = new ProfileNavView({
                router: this.router
            });

            this.router.on('route:addModule', function(id) {

                this.moduleCollection = options.moduleCollection;

                this.moduleCollection.fetch();

                this.userModulesCollection = options.userModulesCollection;

                this.addUserModuleView = new AddUserModuleView({
                    user_id: id,
                    moduleCollection: this.moduleCollection,
                    userModulesCollection: this.userModulesCollection,
                    router: this.router
                });

                // maybe stick in a userModulesCollection fetch here

            },this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.addUserModuleView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.addUserModuleView.$el);
        }
    });

    return AddModulePage;
});