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
    'libs/getCookie',
    'models/GradeAverageModel',
    'views/FooterView'
], function($, _, Backbone, ProfileNavView, UserInfoView, UserModel, UserModulesCollection,
            ModuleView, GradesCollection, GradesView, getCookie, GradeAverageModel, FooterView) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:profile', function(id) {

                this.user = id;

                this.gradesCollection = options.gradesCollection;

                this.navView = new ProfileNavView({
                    user_id: id
                });

                this.footerView = new FooterView();

                this.userModel = new UserModel({id: id});

                this.userModulesCollection = options.userModulesCollection;
                this.userModulesCollection.fetch();
                this.userModel.fetch();

                this.userInfoView = new UserInfoView({
                    userModel: this.userModel
                });

                this.listenTo(this.userModel, 'change', this.render);

                this.moduleView = new ModuleView({
                    userModulesCollection: this.userModulesCollection,
                    gradesCollection: this.gradesCollection,
                    router: this.router,
                    userId: id
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
