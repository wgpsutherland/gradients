// EditGradePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/EditGradeView',
    'views/FooterView',
    'models/UserModel'
], function($, _, Backbone, ProfileNavView, EditGradeView, FooterView, UserModel) {

    var EditGradePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.footerView = new FooterView();

            this.router.on('route:editGrade', function(id, ed, od) {

                this.navView = new ProfileNavView({
                    id: id
                });

                this.gradesCollection = options.gradesCollection;

                this.gradesCollection.fetch({
                    data: "" + od + "x" + id // the module code and the user id
                });

                this.gradeModel = this.gradesCollection.get(ed);  // grade id

                this.editGradeView = new EditGradeView({
                    gradesCollection: this.gradesCollection,
                    gradeModel: this.gradeModel,
                    grade_id: ed,
                    router: this.router
                });

                this.render();

            }, this);
        },
        render: function() {

            this.$el.children().detach();

            this.navView.render();
            this.editGradeView.render();
            this.footerView.render();

            this.$el.append(this.navView.$el);
            this.$el.append(this.editGradeView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return EditGradePage;
});