//==================== Node Modules ====================//

var _ = require('underscore');
var path = require('path');
var express = require('express');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var nconf = require('./config');
var compression = require('compression');

//==================== Libs ====================//

var queries = require('./lib/queries');
var validation = require('./lib/validation');

//==================== Server Logic ====================//

var app = express();

app.use(logfmt.requestLogger());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

// allows for use on the local server and with heroku without changing configs
var port = Number(process.env.PORT || nconf.get('server:port'));

app.listen(port, function() {
    console.log("I'm alive on port " + port + "!");
});

//==================== Server Functions ====================//

// doesn't validate as it is the function doing the validation
app.post('/gradient/v1/login', queries.loginUser);

// don't require validation as they're used to create a user
app.get('/gradient/v1/institutions', queries.getInstitutions);
app.get('/gradient/v1/courses', queries.getCourses);
app.post('/gradient/v1/users', queries.createUser);

// require user validation
app.post('/gradient/v1/userModules', validation.validate, queries.addUserModule);
app.post('/gradient/v1/grade', validation.validate, queries.addGrade);
app.get('/gradient/v1/users/:id', validation.validate, queries.getUser);
app.get('/gradient/v1/userModules/:id', validation.validate, queries.getUserModules);
app.get('/gradient/v1/grades/', validation.validate, queries.getGradesForUserFromModule);
app.get('/gradient/v1/modules', validation.validate, queries.getModules);
app.get('/gradient/v1/assignments', validation.validate, queries.getAssignments);
app.get('/gradient/v1/assignmentType', validation.validate, queries.getAssignmentTypes);
app.get('/gradient/v1/gradeAverage/:id', validation.validate, queries.getGradeAverage);
app.get('/gradient/v1/yearAverages', validation.validate, queries.getYearAverages);
app.delete('/gradient/v1/userModules/:id', validation.validate, queries.deleteUserModule);
app.delete('/gradient/v1/grade/:id', validation.validate, queries.deleteGrade);
app.put('/gradient/v1/grade/:id', validation.validate, queries.updateGrade);

// these require user and admin validation
app.post('/gradient/v1/modules', validation.validate, validation.admin, queries.createModule);
app.post('/gradient/v1/assignments', validation.validate, validation.admin, queries.createAssignment);
