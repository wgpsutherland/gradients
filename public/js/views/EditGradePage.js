// EditGradePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/EditGradeView',
    'views/FooterView'
], function($, _, Backbone, ProfileNavView, EditGradeView, FooterView) {

    var EditGradePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.profileNavView = new ProfileNavView({
                user_id: $("user_id").getCookie()
            });

            this.footerView = new FooterView();

            this.router.on('route:editGrade', function(id, ed, od) {

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

            this.profileNavView.render();
            this.editGradeView.render();
            this.footerView.render();

            this.$el.append(this.profileNavView.$el);
            this.$el.append(this.editGradeView.$el);
            this.$el.append(this.footerView.$el);
        }
    });

    return EditGradePage;
});