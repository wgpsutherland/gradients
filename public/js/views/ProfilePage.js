// ProfilePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/NavView',
    'views/UserInfoView'
], function($, _, Backbone, NavView, UserInfoView) {

    var ProfilePage = Backbone.View.extend({

        initialize: function(options) {

            this.collection.fetch();

            this.navView = new NavView();

            this.userInfoView = new UserInfoView({
                collection: this.collection
            });

            this.router = options.router;

            this.router.on('route:profile', function(id) {

                var userModel = this.collection.get(id);

                if(userModel) {
                    this.userInfoView.render(id);
                } else {
                    this.listenToOnce(this.collection, 'sync', function() {
                        if(this.collection.get(id)) {
                            this.userInfoView.render(id);
                        }
                    });
                }
            }, this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.$el.append(this.navView.$el);

            this.$el.append(this.userInfoView.$el);
        }
    });

    return ProfilePage;
});
