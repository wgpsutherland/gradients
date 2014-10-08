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
app.get('/gradient/v1/users', users.getUsers);
app.get('/gradient/v1/users/:id', users.getUser);
app.get('/gradient/v1/modules/:id', users.getModules);
app.get('/gradient/v1/grades/:id', users.getGradesForUserFromModule);