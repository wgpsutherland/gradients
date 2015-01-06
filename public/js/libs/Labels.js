define([
    'jquery'
], function($) {

    var label = $("<label>")
        .addClass("feedback-label");

    return {
        emptyFields:
            label.clone().text('All fields must be filled out.'),
        invalidUsernamePassword:
            label.clone().text('Invalid username/password.'),
        usernameTooShort:
            label.clone().text('Username must be 15 characters or less long.'),
        passwordsNotMatching:
            label.clone().text('Both passwords must match.'),
        usernameExists:
            label.clone().text('Username already exists.'),
        scoreNotNumber:
            label.clone().text('Score must be a number.'),
        scoreNotNatural:
            label.clone().text('Score must be a natural number.'),
        scoreNotPositive:
            label.clone().text('Score must be positive'),
        gradeSuccess:
            label.clone().text('Successfully added grade.'),
        gradeExists:
            label.clone().text('User already has this assignment.'),
        userModuleExists:
            label.clone().text('User already has this module.'),
        userModuleSuccess:
            label.clone().text('Successfully added module.'),
        assignmentExists:
            label.clone().text('Assignment already exists.'),
        assignmentSuccess:
            label.clone().text('Successfully created assignment.'),
        moduleExists:
            label.clone().text('Module already exists.'),
        moduleSuccess:
            label.clone().text('Successfully created module.'),
        saveFailed:
            label.clone().text('Save failed.')
    }
});