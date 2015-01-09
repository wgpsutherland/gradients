// AdminPage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/FooterView',
    'views/AdminChoiceView',
    'models/UserModel'
], function($, _, Backbone, ProfileNavView, FooterView, AdminChoiceView, UserModel) {

    var AdminPage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.footerView = new FooterView();

            this.router.on('route:admin', function(id) {

                this.navView = new ProfileNavView();

                this.moduleCollection = options.moduleCollection;
                this.assignmentsCollection = options.assignmentsCollection;
                this.assignmentTypeCollection = options.assignmentTypeCollection;

                this.adminChoiceView = new AdminChoiceView({
                    moduleCollection: this.moduleCollection,
                    assignmentsCollection: this.assignmentsCollection,
                    assignmentTypeCollection: this.assignmentTypeCollection
                });


                //this.courseCollection = options.courseCollection;

                //this.courseCollection.fetch();

                this.assignmentTypeCollection.fetch();
                this.moduleCollection.fetch();
                this.adminChoiceView.render();

            }, this);
        },
        render: function() {

            this.$el.children().detach();

            this.navView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.adminChoiceView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return AdminPage;
});