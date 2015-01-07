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

//==================== Server Logic ====================//

var app = express();
app.use(logfmt.requestLogger());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

var port = Number(process.env.PORT || nconf.get('server:port')); // allows for use on the local server and with heroku without changing configs

app.listen(port, function() {
    console.log("I'm alive on port " + port + "!");
});

//==================== Server Listening ====================//

app.post('/gradient/v1/login', queries.loginUser);
app.post('/gradient/v1/users', queries.createUser);
app.post('/gradient/v1/userModules', queries.addUserModule);
app.post('/gradient/v1/modules', queries.createModule);
app.post('/gradient/v1/grade', queries.addGrade);
app.post('/gradient/v1/assignments', queries.createAssignment);
app.get('/gradient/v1/users', queries.getUsers);
app.get('/gradient/v1/users/:id', queries.getUser);
app.get('/gradient/v1/userModules/:id', queries.getUserModules);
app.get('/gradient/v1/grades/', queries.getGradesForUserFromModule);
app.get('/gradient/v1/modules', queries.getModules);
app.get('/gradient/v1/institutions', queries.getInstitutions);
app.get('/gradient/v1/courses', queries.getCourses);
app.get('/gradient/v1/assignments', queries.getAssignments);
app.get('/gradient/v1/assignmentType', queries.getAssignmentTypes);
app.get('/gradient/v1/gradeAverage/:id', queries.getGradeAverage);
app.get('/gradient/v1/yearAverages', queries.getYearAverages);
app.delete('/gradient/v1/userModules/:id', queries.deleteUserModule);
app.delete('/gradient/v1/grade/:id', queries.deleteGrade);
app.put('/gradient/v1/grade/:id', queries.updateGrade);
