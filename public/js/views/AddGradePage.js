// AddGradePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/AddGradeView',
    'views/FooterView',
    'models/UserModel',
    'libs/Utils'
], function($, _, Backbone, ProfileNavView, AddGradeView, FooterView, UserModel, Utils) {

    var AddGradePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.footerView = new FooterView();

            this.router.on('route:addGrade', function(id, od, ed) {

                var userId = Utils.getCookie("user_id");

                this.gradesCollection = options.gradesCollection;
                this.assignmentsCollection = options.assignmentsCollection;

                this.assignmentsCollection.fetch({
                    data: id + "x" + od + "x" + ed
                });

                this.navView = new ProfileNavView();

                this.addGradeView = new AddGradeView({
                    assignmentsCollection: this.assignmentsCollection,
                    gradesCollection: this.gradesCollection,
                    module_id: od,
                    user_id: userId,
                    year: ed,
                    router: this.router
                });

            }, this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.addGradeView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.addGradeView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return AddGradePage;
});