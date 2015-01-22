// ProfilePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/UserInfoView',
    'models/UserModel',
    'collections/UserModulesCollection',
    'views/ModuleView',
    'collections/GradesCollection',
    'views/GradesView',
    'models/GradeAverageModel',
    'views/FooterView',
    'libs/Utils'
], function($, _, Backbone, ProfileNavView, UserInfoView, UserModel, UserModulesCollection,
            ModuleView, GradesCollection, GradesView, GradeAverageModel, FooterView, Utils) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:profile', function() {

                var userId = Utils.getCookie("user_id");
                var username = Utils.getCookie("username");

                this.gradesCollection = options.gradesCollection;
                this.yearAverageCollection = options.yearAverageCollection;

                this.yearAverageCollection.fetch({
                    data: userId
                });

                this.navView = new ProfileNavView();
                this.userModel = new UserModel({id: userId});

                this.userModel.fetch();

                this.footerView = new FooterView();

                this.userModulesCollection = options.userModulesCollection;
                this.userModulesCollection.fetch();

                this.userInfoView = new UserInfoView({
                    userModel: this.userModel,
                    yearAverageCollection: this.yearAverageCollection
                });

                this.listenTo(this.userModel, 'change', this.render);

                this.moduleView = new ModuleView({
                    userModulesCollection: this.userModulesCollection,
                    gradesCollection: this.gradesCollection,
                    router: this.router,
                    username: username,
                    userId: userId
                });

                this.userInfoView.render();
                this.moduleView.render();

            }, this);
        },
        render: function() {

            this.$el.children().detach(); // removes the elements but not the event bindings

            this.navView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.userInfoView.$el);
            this.$el.append(this.moduleView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return ProfilePage;
});
