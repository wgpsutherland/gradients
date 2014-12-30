// AdminPage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/FooterView',
    'views/AdminChoiceView'
], function($, _, Backbone, ProfileNavView, FooterView, AdminChoiceView) {

    var AdminPage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.profileNavView = new ProfileNavView({
                user_id: $("user_id").getCookie()
            });

            this.footerView = new FooterView();

            this.router.on('route:admin', function(id) {

                this.moduleCollection = options.moduleCollection;

                this.adminChoiceView = new AdminChoiceView({
                    moduleCollection: this.moduleCollection
                });


                //this.courseCollection = options.courseCollection;

                //this.courseCollection.fetch();

                this.moduleCollection.fetch();
                this.adminChoiceView.render();

            }, this);
        },
        render: function() {

            this.$el.children().detach();

            this.profileNavView.render();
            this.footerView.render();

            this.$el.append(this.profileNavView.$el);
            this.$el.append(this.adminChoiceView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return AdminPage;
});