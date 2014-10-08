// ProfilePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/UserInfoView',
    'models/UserModel',
    'collections/ModuleCollection',
    'views/ModuleView',
    'collections/GradesCollection',
    'views/GradesView'
], function($, _, Backbone, NavView, UserInfoView, UserModel, ModuleCollection, ModuleView, GradesCollection, GradesView) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.navView = new NavView();

            this.router = options.router;

            this.router.on('route:profile', function(id) {

                this.userModel = new UserModel({id: id});
                this.moduleCollection = new ModuleCollection([],{id: id});
                this.moduleCollection.fetch();

                this.gradesCollection = new GradesCollection([],{id: id});
                this.gradesCollection.fetch();

                this.userInfoView = new UserInfoView({
                    userModel: this.userModel
                });

                this.moduleView = new ModuleView({
                    collection: this.moduleCollection
                });

                this.gradesView = new GradesView({
                    collection: this.gradesCollection
                })

                this.userInfoView.render(id);
                this.moduleView.render();
                this.gradesView.render();

            }, this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.$el.append(this.navView.$el);
            this.$el.append(this.userInfoView.$el);
            this.$el.append(this.moduleView.$el);
            this.$el.append(this.gradesView.$el);
        }
    });

    return ProfilePage;
});
