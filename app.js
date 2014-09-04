var _ = require('underscore');
var path = require('path');
var express = require('express');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');

var idCount = 1;

var userList = [{
	firstname: "Will",
	lastname: "Sutherland",
	age: "20",
	id: "0"
}];

var app = express();
app.use(logfmt.requestLogger());
app.use(bodyParser());

// returns the list of users
var listUsers = function(req, res) {
	console.log("getting the user list");
	res.json(userList);
};

// returns the requested user
var getUser = function(req, res) {
	console.log("edit user");
	var id = (req.params.id);
	var user = _.findWhere(userList, {id: id});
	res.json(user);
};

// adds a new user to the data store
var addUser = function(req, res) {
	console.log("creates new user");
	var newUser = req.body;
	newUser.id = ""+((++idCount)-1);
	userList.push(newUser);
	res.json(newUser);
};

// changes the details of the user
var updateUser = function(req, res) {
	console.log("update");
	var id = (req.params.id);
	var user = _.findWhere(userList, {id: id});
	var index = _.indexOf(userList, user);
	user = userList[index] = req.body;
	res.json(user);
};

// removes the specified user from the data store
var deleteUser = function(req, res) {
	console.log("delete user");
	var id = req.params.id;
	var user = _.findWhere(userList, {id: id});
	var index = _.indexOf(userList, user);
	userList.splice(index, 1);
	res.json(userList);
};

app.get('/users', listUsers);
app.get('/users/:id', getUser);
app.post('/users', addUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.use(express.static(path.join(__dirname, 'public')));

var port = Number(process.env.PORT || 5001); // allows for use on the local server and with heroku without changing configs
app.listen(port, function() {
	console.log("I'm alive on port " + port + "!");
});
