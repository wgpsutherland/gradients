// AddGradePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/AddGradeView'
], function($, _, Backbone, ProfileNavView, AddGradeView) {

    var AddGradePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.router.on('route:addGrade', function(id, od, ed) {

                this.gradesCollection = options.gradesCollection;
                this.assignmentsCollection = options.assignmentsCollection;

                this.assignmentsCollection.fetch({
                    data: od + "x" + ed
                });

                this.navView = new ProfileNavView();

                this.addGradeView = new AddGradeView({
                    assignmentsCollection: this.assignmentsCollection,
                    gradesCollection: this.gradesCollection,
                    module_id: od,
                    user_id: id,
                    year: ed,
                    router: this.router
                });
            }, this);
        },
        render: function() {

            this.$el.empty();

            this.navView.render();
            this.addGradeView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.addGradeView.$el);
        }
    });

    return AddGradePage;
});