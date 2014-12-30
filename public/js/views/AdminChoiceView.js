//Filename: AdminChoiceView.js
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/AdminChoiceTemplate.html',
    'views/CreateModuleView',
    'views/CreateAssignmentView'
], function($, _, Backbone, AdminChoiceTemplate, CreateModuleView, CreateAssignmentView) {

    var AdminChoiceView = Backbone.View.extend({
        initialize: function(options) {
            this.moduleCollection = options.moduleCollection;
            this.assignmentsCollection = options.assignmentsCollection;
            this.assignmentTypeCollection = options.assignmentTypeCollection;
        },
        render: function() {
            var template = _.template(AdminChoiceTemplate);
            this.$el.html(template);
        },
        events: {
            'click .assignment-form-button': 'showAssignmentForm',
            'click .module-form-button': 'showModuleForm',
            'click .course-form-button': 'showCourseForm',
            'click .institution-form-button': 'showInstitutionForm',
            'click .admin-form-button': 'showAdminForm'
        },
        showAssignmentForm: function(ev) {

            this.render(); // clears the other forms from the view

            this.moduleCollection.fetch();

            this.createAssignmentView = new CreateAssignmentView({
                assignmentsCollection: this.assignmentsCollection,
                moduleCollection: this.moduleCollection,
                assignmentTypeCollection: this.assignmentTypeCollection
            })

            this.createAssignmentView.render();

            this.$el.append(this.createAssignmentView.$el);
        },
        showModuleForm: function(ev) {

            this.render(); // clears the other forms from the view

            this.createModuleView = new CreateModuleView({
                collection: this.moduleCollection
            });

            this.createModuleView.render();

            this.$el.append(this.createModuleView.$el);
        },
        showCourseForm: function(ev) {
            console.log("courses");
            this.render(); // clears the other forms from the view
        },
        showInstitutionForm: function(ev) {
            console.log("unis");
            this.render(); // clears the other forms from the view
        },
        showAdminForm: function(ev) {
            console.log("admins");
            this.render(); // clears the other forms from the view
        }
    });

    return AdminChoiceView;
});
