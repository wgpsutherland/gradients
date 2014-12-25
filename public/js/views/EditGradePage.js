// EditGradePage.js
define([
    'jquery',
    'underscore',
    'backbone',
    'views/ProfileNavView',
    'views/EditGradeView'
], function($, _, Backbone, ProfileNavView, EditGradeView) {

    var EditGradePage = Backbone.View.extend({

        initialize: function(options) {

            this.router = options.router;

            this.profileNavView = new ProfileNavView({
                user_id: $("user_id").getCookie()
            });

            this.router.on('route:editGrade', function(id, ed) {

                this.gradesCollection = options.gradesCollection;

                this.gradeModel = this.gradesCollection.get(ed);  // grade id

                this.editGradeView = new EditGradeView({
                    gradesCollection: this.gradesCollection,
                    gradeModel: this.gradeModel
                });

                this.render();

            }, this);
        },
        render: function() {

            this.$el.empty();

            this.profileNavView.render();
            this.editGradeView.render();

            this.$el.append(this.profileNavView.$el);
            this.$el.append(this.editGradeView.$el);
        }
    });

    return EditGradePage;
});