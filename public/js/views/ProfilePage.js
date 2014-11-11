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
    'libs/getCookie'
], function($, _, Backbone, ProfileNavView, UserInfoView, UserModel, UserModulesCollection,
            ModuleView, GradesCollection, GradesView, getCookie) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:profile', function(id) {

                this.user = id;

                this.gradesCollection = options.gradesCollection;

                this.navView = new ProfileNavView({
                    user_id: id
                });

                this.userModel = new UserModel({id: id});

                this.userModulesCollection = options.userModulesCollection;
                this.userModulesCollection.fetch();
                this.userModel.fetch();

                this.userInfoView = new UserInfoView({
                    userModel: this.userModel
                });

                this.listenTo(this.userModel, 'change', this.render);

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
            'click .show-grades': 'showGrades',
            'click .delete-user-module': 'deleteUserModule'
        },
        showGrades: function(ev) {

            this.render();

            this.gradesCollection.fetch({
                data: ev.currentTarget.attributes[2].value
            });

            this.gradesView = new GradesView({
                collection: this.gradesCollection
            });

            this.gradesView.render();

            this.$el.append(this.gradesView.$el);
        },
        deleteUserModule: function(ev) {

            var id = ev.currentTarget.attributes[2].value; // extracts the model id from the delete button

            this.model = this.userModulesCollection.get(id); // fetches the model from the collection

            this.model.destroy({ // removes the model from the collection

                data: { // sending along the id of the user
                    user_id: this.user
                },
                processData: true,
                success: _.bind(function() { // on removal success
                    // do something to indicate that it worked
                }, this)
            });
        }
    });

    return ProfilePage;
});
