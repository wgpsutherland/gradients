// AddModulePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/AddUserModuleView',
    'collections/UserModulesCollection',
    'views/FooterView',
    'models/UserModel',
    'libs/Utils'
], function($, _, Backbone, ProfileNavView, AddUserModuleView, UserModulesCollection, FooterView, UserModel, Utils) {

    var AddModulePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:addModule', function(id) {

                var userId = Utils.getCookie("user_id");

                this.navView = new ProfileNavView();

                this.moduleCollection = options.moduleCollection;

                this.moduleCollection.fetch();

                this.userModulesCollection = options.userModulesCollection;

                this.addUserModuleView = new AddUserModuleView({
                    user_id: userId,
                    moduleCollection: this.moduleCollection,
                    userModulesCollection: this.userModulesCollection,
                    router: this.router
                });

                this.footerView = new FooterView();

            },this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.addUserModuleView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.addUserModuleView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return AddModulePage;
});