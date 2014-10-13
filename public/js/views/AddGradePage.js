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

            this.router.on('route:addGrade', function(id, od) {

                this.gradesCollection = options.gradesCollection;

                var data = ""+od+"x"+$("user_id").getCookie();

                this.gradesCollection.fetch({
                    data: data
                });

                this.navView = new ProfileNavView();
                this.addGradeView = new AddGradeView({
                    gradesCollection: this.gradesCollection,
                    module_id: od
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