// AdminPage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/FooterView'
], function($, _, Backbone, ProfileNavView, FooterView) {

    var AdminPage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.profileNavView = new ProfileNavView({
                user_id: $("user_id").getCookie()
            });

            this.footerView = new FooterView();

            this.router.on('route:admin', function(id) {

                this.moduleCollection = options.moduleCollection;
                this.assignmentsCollection = options.assignmentsCollection;
                this.courseCollection = options.courseCollection;

                this.moduleCollection.fetch();
                this.courseCollection.fetch();
                this.assignmentsCollection.fetch();
            });
        },
        render: function() {

            this.$el.empty();

            this.profileNavView.render();
            this.footerView.render();

            this.$el.append(this.profileNavView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return AdminPage;
});