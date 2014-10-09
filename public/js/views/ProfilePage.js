// ProfilePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/UserInfoView',
    'models/UserModel',
    'collections/UserModulesCollection',
    'views/ModuleView',
    'collections/GradesCollection',
    'views/GradesView',
    'libs/getCookie'
], function($, _, Backbone, NavView, UserInfoView, UserModel, UserModulesCollection,
            ModuleView, GradesCollection, GradesView, getCookie) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:profile', function(id) {

                this.navView = new NavView();

                this.userModel = new UserModel({id: id});

                this.userModulesCollection = options.userModulesCollection;
                this.userModulesCollection.fetch();

                this.userInfoView = new UserInfoView({
                    userModel: this.userModel
                });

                this.moduleView = new ModuleView({
                    collection: this.userModulesCollection,
                    router: this.router,
                    userId: id
                });

                this.userInfoView.render();
                this.moduleView.render();
            }, this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.userInfoView.$el);
            this.$el.append(this.moduleView.$el);
        },
        events: {
            'click .show-grades': 'showGrades'
        },
        showGrades: function(ev) {

            this.render();

            this.gradesCollection = new GradesCollection([],{id: ev.currentTarget.attributes[2].value});
            this.gradesCollection.fetch();

            this.gradesView = new GradesView({
                collection: this.gradesCollection
            });

            this.gradesView.render();

            this.$el.append(this.gradesView.$el);
        }
    });

    return ProfilePage;
});
