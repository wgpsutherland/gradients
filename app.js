//==================== Node Modules ====================//

var _ = require('underscore');
var path = require('path');
var express = require('express');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var nconf = require('./config');

//==================== Libs ====================//

var users = require('./lib/users');

//==================== Server Logic ====================//

var app = express();
app.use(logfmt.requestLogger());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

var port = Number(process.env.PORT || nconf.get('server:port')); // allows for use on the local server and with heroku without changing configs
app.listen(port, function() {
    console.log("I'm alive on port " + port + "!");
});

//==================== Server Listening ====================//

app.post('/gradient/v1/login', users.loginUser);
app.post('/gradient/v1/users', users.createUser);
app.post('/gradient/v1/userModules', users.addUserModule);
app.post('/gradient/v1/modules', users.createModule);
app.post('/gradient/v1/grade', users.addGrade);
app.get('/gradient/v1/users', users.getUsers);
app.get('/gradient/v1/users/:id', users.getUser);
app.get('/gradient/v1/userModules/:id', users.getUserModules);
app.get('/gradient/v1/grades/', users.getGradesForUserFromModule);
app.get('/gradient/v1/modules', users.getModules);
app.get('/gradient/v1/institutions', users.getInstitutions);
app.get('/gradient/v1/courses', users.getCourses);
app.get('/gradient/v1/assignments', users.getAssignments);
app.delete('/gradient/v1/userModules/:id', users.deleteUserModule);
app.get('/gradient/v1/gradeAverage/:id', users.getGradeAverage);
app.put('/gradient/v1/grade/:id', users.updateGrade);
app.delete('/gradient/v1/grade/:id', users.deleteGrade);