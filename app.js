var _ = require('underscore');
var path = require('path');
var express = require('express');
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var nconf = require('./config');

var app = express();
app.use(logfmt.requestLogger());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));

var port = Number(process.env.PORT || nconf.get('server:port')); // allows for use on the local server and with heroku without changing configs
app.listen(port, function() {
    console.log("I'm alive on port " + port + "!");
});